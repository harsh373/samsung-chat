// FILE: client/src/components/TypingIndicator.jsx
// ONE JOB: Show three bouncing dots while the LLM is generating a response.
// No props needed — it either renders or it doesn't. Pure visual, zero logic.

export default function TypingIndicator() {
  return (
    // Same left-aligned layout as an assistant bubble
    <div className="flex justify-start">
      <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">

        {/* Three dots — each has an animation-delay so they bounce in sequence, not together */}
        {/* animate-bounce is a Tailwind utility that applies a CSS keyframe animation */}
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
        {/* [animation-delay:Xms] is Tailwind's arbitrary value syntax — square brackets let you 
            use any CSS value that doesn't have a pre-built utility class */}
      </div>
    </div>
  );
}