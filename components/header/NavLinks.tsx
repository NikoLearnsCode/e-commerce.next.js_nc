import DesktopNav from './NavDesktop';
import MobileNav from './NavMobile';



export interface SubLink {
  title: string;
  href: string;
}

export interface NavLink {
  title: string;
  href: string;
  subLinks?: SubLink[];
}
  

const navLinks: NavLink[] = [
  {
    title: 'Dam',
    href: '/c/dam',
    subLinks: [
      {title: 'KLÄNNINGAR', href: '/c/dam/klanningar'},
      {title: 'BYXOR', href: '/c/dam/byxor'},
      {title: 'JACKOR', href: '/c/dam/jackor'},
      {title: 'TOPPAR', href: '/c/dam/Toppar'},

      {title: 'ERBJUDANDEN', href: '/c/dam'},
    ],
  },
  {
    title: 'Herr',
    href: '/c/herr',
    subLinks: [
      {title: 'SKJORTOR', href: '/c/herr/overshirt'},
      {title: 'BYXOR', href: '/c/herr/byxor'},
      {title: 'JACKOR', href: '/c/herr/jackor'},
      {title: 'T-SHIRTS', href: '/c/herr/t-shirts'},
      {title: 'ERBJUDANDEN', href: '/c/herr'},
    ],
  },

  // {
  //   title: 'Sport',
  //   href: '',
  //   subLinks: [
  //     {title: 'Sport för Kvinnor', href: '/c/dam'},
  //     {title: 'Sport för Män', href: '/c/herr'},
  //   ],
  // },
  {
    title: 'Hem',
    href: '/',
    subLinks: [
      {title: 'Kontakta oss', href: '/'},
      {title: 'Returer', href: '/'},
      {title: 'Frakt', href: '/'},
      // {title: 'Kontakta oss1', href: '/'},
      // {title: 'Returer2', href: '/'},
      // {title: 'Frakt3', href: '/'},
      // {title: 'Kontakta oss4', href: '/'},
      // {title: 'Returer5', href: '/'},
      // {title: 'Frakt6', href: '/'},
      // {title: 'Kontakta oss7', href: '/'},
      // {title: 'Returer8', href: '/'},
      // {title: 'Frakt9', href: '/'},
      // {title: 'Kontakta oss10', href: '/'},
      // {title: 'Returer11', href: '/'},
      // {title: 'Frakt12', href: '/'},
      // {title: 'Kontakta oss13', href: '/'},
      // {title: 'Returer14', href: '/'},
      // {title: 'Frakt15', href: '/'},
      // {title: 'Kontakta oss16', href: '/'},
      // {title: 'Returer17', href: '/'},
      // {title: 'Frakt18', href: '/'},
      // {title: 'Kontakta oss19', href: '/'},
      // {title: 'Returer20', href: '/'},
      // {title: 'Frakt21', href: '/'},
      // {title: 'Kontakta oss22', href: '/'},
      // {title: 'Returer23', href: '/'},
      // {title: 'Frakt24', href: '/'},
      // {title: 'Kontakta oss25', href: '/'},
      // {title: 'Returer26', href: '/'},
      

      
      

  
      
      

     

    ],
  },
];

export default function Navigation() {
  return (
    <>
      <div className='md:hidden'>
        <MobileNav navLinks={navLinks} />
      </div>
      <div className='hidden md:block'>
        <DesktopNav navLinks={navLinks} />
      </div>
    </>
  );
}
