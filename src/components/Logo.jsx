import LogoImage from '@assets/img/logo.png'

export const ExapLogo = ({imgClass, TitleClass, spanClass, contentClass }) => {
  return (
    <div className=' flex items-center gap-x-2'>
    <img className={`${imgClass} w-[50px] `} src={LogoImage} alt="Logo" />

     <div className={` uppercase flex flex-col ${contentClass} `}>
     <h3 className={`h3 text-accent tracking-[3px] ${TitleClass}  `}>Exclusive</h3>
     <span className={`font-tertiary tracking-[3px] text-[14px] mt-[-8px] ${spanClass}  `}>Apartments & Suites</span>

     </div>
</div>
  )
}

