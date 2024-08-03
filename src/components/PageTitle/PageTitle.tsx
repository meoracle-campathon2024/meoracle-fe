const PageTitle = ({title, ...props}: {title:string}) => {
    return <h1 className="text-lg font-bold uppercase mb-10">{title}</h1> 
}

export default PageTitle