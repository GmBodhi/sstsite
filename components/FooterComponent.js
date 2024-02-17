import Link from "next/link";
export default function Footer() {
    const docs =`
        As we step into the last day of Arts'24, 
        we are excited to release the source code of this project, 
        fostering open-source development.
        `
    return (
        <div className="flex flex-col justify-items-center mb-20 text-center">
            <p className="text-slate-300">{docs}<Link 
                href={'/team'}
                className="text-blue-500"
            >view source code</Link></p>
        </div>
    );
}
