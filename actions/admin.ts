// 'use server';

// import {createClient} from '@/utils/supabase/server';
// import {productSchema} from '@/lib/validators';
// import {z} from 'zod';

// export async function addProduct(data: z.infer<typeof productSchema>) {
//   try {
//     const supabase = await createClient();
//     const {data: product, error} = await supabase
//       .from('products')
//       .insert([data])
//       .select()
//       .single();

//     if (error) {
//       return {success: false, error: error.message};
//     }
//     return {success: true, product};
//   } catch (error) {
//     console.error('Error adding product:', error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error occurred',
//     };
//   }
// }



// export async function deleteProduct(id: string) {
//   try {
//     const supabase = await createClient();
//     const {error} = await supabase.from('products').delete().eq('id', id);
//     if (error) {
//       return {success: false, error: error.message};
//     }
//     return {success: true};
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error occurred',
//     };
//   }
// }
