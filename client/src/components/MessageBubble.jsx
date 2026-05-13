
export default function MessageBubble({ role, content }) {
  const isUser = role === "user"; 

  return (
    
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      
      <div
        className={`
          max-w-[75%]       
          rounded-2xl        
          px-4 py-3          
          text-sm            
          leading-relaxed    
          whitespace-pre-wrap 
          ${isUser
            ? "bg-blue-600 text-white rounded-br-sm"    
           : "bg-gray-800 text-gray-100 rounded-bl-sm" 
          }
        `}
      >
        {content}
      </div>
    </div>
  );
}