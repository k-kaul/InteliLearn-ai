export default function SectionHeading({ title, description }: {
    title:string;
    description: string;
}){
    return (
        <div className="text-center">
            <h2 className="section-heading mb-4">{title}</h2>
            <p className="section-description text-gray-100">{description}</p>
        </div>
    )
}