
import { useState } from "react";

export default function InputBar({ onSend, loading }) {

  const [text, setText] = useState("");

  function handleSubmit() {
    if (!text.trim() || loading) return; 
    onSend(text);   
    setText("");    
  }

  function handleKeyDown(e) {
    
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmit();
    }
  }

  return (
   
    <div className="border-t border-gray-800 bg-gray-900 px-4 py-4">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">

        
        <textarea
          className="
            flex-1              
            resize-none          
            bg-gray-800          
            text-white          
            rounded-xl         
            px-4 py-3           
            text-sm              
            outline-none         
            focus:ring-2 focus:ring-blue-500  
            placeholder-gray-500 
            max-h-40             
            overflow-y-auto      
            disabled:opacity-50 
          "
          placeholder="Ask about Samsung phones..."
          value={text}                          
          onChange={(e) => setText(e.target.value)} 
          onKeyDown={handleKeyDown}            
          disabled={loading}                    
          rows={1}                             
        />

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()} 
          className="
            bg-blue-600          
            hover:bg-blue-500   
            disabled:opacity-40  
            disabled:cursor-not-allowed 
            text-white
            rounded-xl
            px-4 py-3
            text-sm font-medium
            transition-colors    
            whitespace-nowrap   
            shrink-0       
          "
        >
          {loading ? "..." : "Send"} 
        </button>
      </div>

     {/*bOTTOM NOTE */}
      <p className="text-xs text-gray-600 text-center mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}