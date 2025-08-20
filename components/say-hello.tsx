export default function SayHello({text, className} : {text? : string, className? : string}){
 return (
    <div className={className}>{text || "Hello"}</div>
 )
}