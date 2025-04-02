'use server';

import {createClient} from '@/utils/supabase/server';
import {getOrCreateSessionId, getSessionId} from '@/utils/cookies';
import {CartItem} from '@/lib/validators';

// Hämta varukorg baserat på session eller user ID
export async function getCart() {
  try {
    const supabase = await createClient();

    // Kontrollera om användaren är inloggad
    const {
      data: {user},
    } = await supabase.auth.getUser();

    let cart;

    if (user) {
      // Om inloggad, försök hitta användarens varukorg
      const {data} = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      cart = data;
    } else {
      // Om inte inloggad, kolla om det finns en session_id
      const sessionId = await getSessionId();

      // Om ingen session_id finns, returnera en tom varukorg
      if (!sessionId) {
        return {cart: null, cartItems: []};
      }

      // Annars hämta varukorgen kopplad till session_id
      const {data} = await supabase
        .from('carts')
        .select('*')
        .eq('session_id', sessionId)
        .is('user_id', null)
        .maybeSingle();

      cart = data;
    }

    // Om ingen varukorg hittades, returnera en tom varukorg utan att skapa en ny
    if (!cart) {
      return {cart: null, cartItems: []};
    }

    return {cart, cartItems: cart?.items || []};
  } catch (error) {
    console.error('Error fetching cart:', error);
    return {cart: null, cartItems: [], error: 'Failed to fetch cart'};
  }
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Lägg till/uppdatera produkt i varukorg
export async function addToCart(cartItem: CartItem) {
  try {
    const supabase = await createClient();

    // Kontrollera om användaren är inloggad
    const {
      data: {user},
    } = await supabase.auth.getUser();

    // Hämta eller skapa session_id (endast om användaren inte är inloggad)
    const sessionId = user ? null : await getOrCreateSessionId();

    // Hämta varukorgen
    let {cart} = await getCart();

    // Om ingen varukorg finns, skapa en ny
    if (!cart) {
      const newCart = {
        session_id: user ? null : sessionId,
        user_id: user?.id || null,
        items: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const {data: createdCart, error: createError} = await supabase
        .from('carts')
        .insert(newCart)
        .select()
        .single();

      if (createError) throw createError;
      cart = createdCart;
    }

    // Kolla om produkten redan finns i varukorgen
    const currentCartItems = cart.items || [];
    const existingItemIndex = currentCartItems.findIndex(
      (item: CartItem) =>
        item.product_id === cartItem.product_id && item.size === cartItem.size
    );

    let updatedCartItems;

    if (existingItemIndex >= 0) {
      // Uppdatera kvantitet om produkten redan finns
      updatedCartItems = [...currentCartItems];
      updatedCartItems[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // Lägg till ny produkt
      updatedCartItems = [...currentCartItems, cartItem];
    }

    // Uppdatera varukorgen
    const {error: updateError} = await supabase
      .from('carts')
      .update({
        items: updatedCartItems,
        updated_at: new Date().toISOString(),
      })
      .eq('id', cart.id);

    if (updateError) throw updateError;

    return {
      success: true,
      cartItems: updatedCartItems,
      cart: cart,
    };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return {success: false, error: 'Failed to add item to cart'};
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Ta bort produkt från varukorg
export async function removeFromCart(itemId: string) {
  try {
    const supabase = await createClient();

    // Hämta varukorgen
    const {cart} = await getCart();

    // Om ingen varukorg finns, returnera success (inget att ta bort)
    if (!cart) {
      return {success: true, cartItems: []};
    }

    const currentCartItems = cart.items || [];
    const updatedCartItems = currentCartItems.filter(
      (item: CartItem) => item.id !== itemId
    );

    // Om varukorgen blir tom efter borttagning, ta bort hela varukorgen från databasen
    if (updatedCartItems.length === 0) {
      const {error: deleteError} = await supabase
        .from('carts')
        .delete()
        .eq('id', cart.id);

      if (deleteError) {
        console.error('Error deleting empty cart:', deleteError);
        return {success: false, error: 'Failed to delete empty cart'};
      }

      return {success: true, cartItems: []};
    }

    // Annars uppdatera varukorgen med de återstående produkterna
    const {error: updateError} = await supabase
      .from('carts')
      .update({
        items: updatedCartItems,
        updated_at: new Date().toISOString(),
      })
      .eq('id', cart.id);

    if (updateError) throw updateError;

    return {success: true, cartItems: updatedCartItems};
  } catch (error) {
    console.error('Error removing from cart:', error);
    return {success: false, error: 'Failed to remove item from cart'};
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Uppdatera kvantitet för en produkt
export async function updateCartItemQuantity(itemId: string, quantity: number) {
  try {
    const supabase = await createClient();

    // Om kvantiteten är 0 eller mindre, ta bort produkten från varukorgen
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }

    // Hämta varukorgen
    const {cart} = await getCart();

    // Om ingen varukorg finns, returnera error
    if (!cart) {
      return {success: false, error: 'Cart not found'};
    }

    const currentCartItems = cart.items || [];
    const itemIndex = currentCartItems.findIndex(
      (item: CartItem) => item.id === itemId
    );

    if (itemIndex === -1) {
      return {success: false, error: 'Item not found in cart'};
    }

    const updatedCartItems = [...currentCartItems];
    updatedCartItems[itemIndex].quantity = quantity;

    // Uppdatera varukorgen
    const {error: updateError} = await supabase
      .from('carts')
      .update({
        items: updatedCartItems,
        updated_at: new Date().toISOString(),
      })
      .eq('id', cart.id);

    if (updateError) throw updateError;

    return {success: true, cartItems: updatedCartItems};
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return {success: false, error: 'Failed to update item quantity'};
  }
}

//Clear cart
export async function clearCart() {
  try {
    const supabase = await createClient();
    const {cart} = await getCart();
    if (!cart) {
      return {success: true, cartItems: []};
    }
    const {error: deleteError} = await supabase
      .from('carts')
      .delete()
      .eq('id', cart.id);

    if (deleteError) throw deleteError;
    return {success: true, cartItems: []};
  } catch (error) {
    console.error('Error clearing cart:', error);
    return {success: false, error: 'Failed to clear cart'};
  }
}

// Rensa tomma varukorgar från databasen
// Denna funktion kan anropas regelbundet via en cron job eller liknande
/*
export async function cleanupEmptyCarts() {
  try {
    const supabase = await createClient();
    
    // Ta bort varukorgar som har en tom items-array
    const {error: deleteEmptyError} = await supabase
      .from('carts')
      .delete()
      .is('items', null)
      .or('items.length.eq.0');
    
    if (deleteEmptyError) {
      console.error('Error deleting empty carts:', deleteEmptyError);
      return {success: false, error: deleteEmptyError};
    }
    
    // Ta bort gamla anonyma varukorgar (äldre än 30 dagar)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const {error: deleteOldError} = await supabase
      .from('carts')
      .delete()
      .is('user_id', null)
      .lt('updated_at', thirtyDaysAgo.toISOString());
    
    if (deleteOldError) {
      console.error('Error deleting old anonymous carts:', deleteOldError);
      return {success: false, error: deleteOldError};
    }
    
    return {success: true};
  } catch (error) {
    console.error('Error cleaning up carts:', error);
    return {success: false, error};
  }
}
*/
