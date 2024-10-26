import React from 'react'

const code = `<span class="hljs-keyword">const</span> FlowcatchClient = <span class="hljs-built_in">require</span>(<span class="hljs-string">'flowcatch-client'</span>)

<span class="hljs-keyword">const</span> FLOWCATCH = <span class="hljs-keyword">new</span> FlowcatchClient({
<span class="hljs-attr">  source</span>: <span class="hljs-string">'${window.location.href}'</span>,
<span class="hljs-attr">  target</span>: <span class="hljs-string">'http://localhost:3000/events'</span>,
<span class="hljs-attr">  logger</span>: <span class="hljs-built_in">console</span>
})

<span class="hljs-keyword">const</span> events = FLOWCATCH.start()

<span class="hljs-comment">// Stop forwarding events</span>
events.close()`

export default function CodeExample () {
  return (
    <pre dangerouslySetInnerHTML={{ __html: code }} />
  )
}
