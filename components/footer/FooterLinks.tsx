import {FooterData} from './Footer';
import Link from 'next/link';

interface FooterLinksProps {
  data: FooterData;
}

export default function FooterLinks({data}: FooterLinksProps) {
  return (
    <div className='max-w-7xl  mx-auto  py-4 px-6'>
      <div className='flex flex-wrap py-10 text-sm gap-4 font-semibold md:justify-center space-x-10  font-syne'>
        {data.socials.map((social) => (
          <Link
            key={social.platform}
            href={social.href}
            target='_blank'
            className='border-b pb-1 border-transparent hover:border-black transition'
          >
            {social.platform}
          </Link>
        ))}
      </div>
      <div className='flex pt-6 flex-col font-medium text-sm sm:flex-row justify-between space-y-5 space-x-4  '>
        {data.columns.map((column, index) => (
          <ul key={index} className='space-x-4 '>
            {column.links.map((link) => (
              <li
                key={link.text}
                className='w-fit mb-3 pb-1 border-b border-transparent  hover:border-black transition'
              >
                <Link href={link.href}>{link.text}</Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {/* <p className='pt-5 text-center'>{data.copyright}</p> */}
    </div>
  );
}
