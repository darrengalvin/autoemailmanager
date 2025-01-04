(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[662],{1948:(e,s,a)=>{Promise.resolve().then(a.bind(a,8195))},6113:(e,s,a)=>{"use strict";a.d(s,{u:()=>l});var t=a(5155);function l(e){let{className:s="w-6 h-6"}=e;return(0,t.jsxs)("svg",{className:s,viewBox:"0 0 23 23",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("path",{fill:"currentColor",d:"M0 0h11v11H0z"}),(0,t.jsx)("path",{fill:"currentColor",d:"M12 0h11v11H12z"}),(0,t.jsx)("path",{fill:"currentColor",d:"M0 12h11v11H0z"}),(0,t.jsx)("path",{fill:"currentColor",d:"M12 12h11v11H12z"})]})}},8195:(e,s,a)=>{"use strict";a.d(s,{SettingsPanel:()=>es});var t=a(5155),l=a(2115),n=a(8236);function i(){return(0,t.jsx)("div",{className:"bg-white border-b",children:(0,t.jsx)("div",{className:"container mx-auto px-4 py-4",children:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(n.A,{className:"w-6 h-6 text-primary"}),(0,t.jsx)("h1",{className:"text-2xl font-semibold text-gray-900",children:"Settings"})]})})})}var r=a(9928),o=a(7410),d=a(6462),c=a(4430),m=a(2640),u=a(1476);function x(e){let{activeSection:s,onSectionChange:a}=e,l=[{id:"general",label:"General",icon:n.A},{id:"branding",label:"Branding",icon:r.A},{id:"ai-models",label:"AI Models",icon:o.A},{id:"email",label:"Email",icon:d.A},{id:"integrations",label:"Integrations",icon:c.A},{id:"security",label:"Security",icon:m.A},{id:"database",label:"Database",icon:u.A}];return(0,t.jsx)("nav",{className:"w-48 space-y-0.5",children:l.map(e=>{let{id:l,label:n,icon:i}=e;return(0,t.jsxs)("button",{onClick:()=>a(l),className:"w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ".concat(s===l?"bg-primary text-white":"text-gray-600 hover:bg-gray-100"),children:[(0,t.jsx)(i,{className:"w-4 h-4"}),n]},l)})})}function g(e){let{settings:s,onUpdate:a}=e;return(0,t.jsx)("div",{className:"space-y-6",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"text-lg font-medium text-gray-900 mb-4",children:"General Settings"}),(0,t.jsxs)("div",{className:"grid gap-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Default Language"}),(0,t.jsxs)("select",{className:"w-full rounded-md border-gray-300",value:s.emailSettings.language,onChange:e=>a({emailSettings:{...s.emailSettings,language:e.target.value}}),children:[(0,t.jsx)("option",{value:"en",children:"English"}),(0,t.jsx)("option",{value:"es",children:"Spanish"}),(0,t.jsx)("option",{value:"fr",children:"French"}),(0,t.jsx)("option",{value:"de",children:"German"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Time Zone"}),(0,t.jsxs)("select",{className:"w-full rounded-md border-gray-300",children:[(0,t.jsx)("option",{children:"UTC"}),(0,t.jsx)("option",{children:"Eastern Time"}),(0,t.jsx)("option",{children:"Pacific Time"}),(0,t.jsx)("option",{children:"Central European Time"})]})]})]})]})})}var h=a(2316),p=a(8684),y=a(6972),f=a(7776),j=a(2925);function b(e){let{config:s,onUpdate:a}=e,[n,i]=(0,l.useState)(s),[o,d]=(0,l.useState)(s.logoUrl),[c,m]=(0,l.useState)(!1),[u,x]=(0,l.useState)(null),{updateSettings:g}=(0,j.x)(),b=async e=>{var s;let t=null===(s=e.target.files)||void 0===s?void 0:s[0];if(t){x(null),m(!0);try{let e=(0,f.U)();if(!e)throw Error("Could not initialize Supabase client");let{data:s,error:l}=await e.storage.createBucket("logos",{public:!0,fileSizeLimit:2097152});if(l&&!l.message.includes("already exists"))throw l;let r=t.name.split(".").pop(),o="logo-".concat(Date.now(),".").concat(r),{data:c,error:m}=await e.storage.from("logos").upload(o,t,{cacheControl:"3600",upsert:!1});if(m)throw m;let{data:{publicUrl:u}}=e.storage.from("logos").getPublicUrl(c.path),x={...n,logoUrl:u};i(x),d(u),a(x),g(x)}catch(e){console.error("Error uploading logo:",e),x(e instanceof Error?e.message:"Failed to upload logo")}finally{m(!1)}}};return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(r.A,{className:"w-5 h-5 text-primary"}),(0,t.jsx)("h2",{className:"text-lg font-medium",children:"Branding Settings"})]}),(0,t.jsx)("div",{className:"grid gap-6",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Company Logo"}),(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsx)("div",{className:"w-16 h-16 border rounded-lg flex items-center justify-center bg-gray-50",children:o?(0,t.jsx)("img",{src:o,alt:"Logo",className:"max-w-full max-h-full object-contain",onError:()=>d(null)}):(0,t.jsx)(h.A,{className:"w-8 h-8 text-gray-400"})}),(0,t.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,t.jsxs)("label",{className:"cursor-pointer",children:[(0,t.jsx)("input",{type:"file",className:"hidden",accept:"image/*",onChange:b,disabled:c}),(0,t.jsxs)("span",{className:"inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50",children:[(0,t.jsx)(p.A,{className:"w-4 h-4"}),c?"Uploading...":"Upload Logo"]})]}),(0,t.jsx)("p",{className:"text-xs text-gray-500",children:"Maximum file size: 2MB. Supported formats: PNG, JPG, SVG"})]})]}),u&&(0,t.jsxs)("div",{className:"mt-2 flex items-center gap-2 text-sm text-red-600",children:[(0,t.jsx)(y.A,{className:"w-4 h-4"}),u]})]})})]})}let v={anthropic:{name:"Anthropic Claude",description:"Advanced language model with strong reasoning capabilities",defaultConfig:{enabled:!0,apiKey:"",maxTokens:2e3,temperature:.7,prompts:{systemPrompt:"You are an AI assistant helping with email management.",additionalInstructions:""}}},openai:{name:"OpenAI GPT-4",description:"Latest GPT model with enhanced capabilities",defaultConfig:{enabled:!1,apiKey:"",maxTokens:2e3,temperature:.7,prompts:{systemPrompt:"You are an AI assistant helping with email management.",additionalInstructions:""}}},deepseek:{name:"DeepSeek",description:"Advanced AI model for complex tasks",defaultConfig:{enabled:!1,apiKey:"",maxTokens:2e3,temperature:.7,prompts:{systemPrompt:"You are an AI assistant helping with email management.",additionalInstructions:""}}}};function N(){return Object.entries(v).reduce((e,s)=>{let[a,{defaultConfig:t}]=s;return{...e,[a]:t}},{})}function w(e){let{models:s,activeTab:a,onTabChange:l}=e;return(0,t.jsx)("div",{className:"flex gap-2",children:Object.entries(s).map(e=>{let[s]=e;return(0,t.jsx)("button",{onClick:()=>l(s),className:"px-4 py-2 rounded-md text-sm font-medium ".concat(a===s?"bg-primary text-white":"text-gray-600 hover:bg-gray-100"),children:s.charAt(0).toUpperCase()+s.slice(1)},s)})})}var A=a(7594),k=a(9191);async function C(e,s){if(!s.apiKey)return{success:!1,message:"API key is required"};try{let a=await fetch("/api/ai/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:e,config:s,testInput:s.prompts.systemPrompt})});if(!a.ok){let e=await a.json();throw Error(e.error||"API test failed")}let t=await a.json();return{success:!0,message:"API test successful",response:t.response}}catch(e){return console.error("AI test failed:",e),{success:!1,message:e instanceof Error?e.message:"API test failed"}}}function S(e){let{modelId:s,config:a,onUpdate:n,showAdvanced:i}=e,[r,o]=(0,l.useState)(!1),[d,c]=(0,l.useState)(null),[m,u]=(0,l.useState)(null),x=async()=>{if(!a.apiKey){u("API key is required");return}o(!0),c(null),u(null);try{let e=await C(s,a);e.success?c("API test successful"):u(e.message)}catch(e){u(e instanceof Error?e.message:"API test failed")}finally{o(!1)}};return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"API Key"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("input",{type:"password",value:a.apiKey,onChange:e=>n({apiKey:e.target.value}),className:"flex-1 rounded-md",placeholder:"Enter ".concat(s," API key")}),(0,t.jsx)("button",{onClick:x,disabled:r||!a.apiKey,className:"px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2",children:r?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(A.A,{className:"w-4 h-4 animate-spin"})," Testing..."]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(k.A,{className:"w-4 h-4"})," Test API"]})})]}),d&&(0,t.jsxs)("div",{className:"mt-2 text-sm text-green-600 flex items-center gap-2",children:[(0,t.jsx)(k.A,{className:"w-4 h-4"}),d]}),m&&(0,t.jsxs)("div",{className:"mt-2 text-sm text-red-600 flex items-center gap-2",children:[(0,t.jsx)(y.A,{className:"w-4 h-4"}),m]})]}),i&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Max Tokens"}),(0,t.jsx)("input",{type:"number",value:a.maxTokens,onChange:e=>n({maxTokens:parseInt(e.target.value)}),className:"w-32 rounded-md",min:1,max:32e3})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Temperature"}),(0,t.jsx)("input",{type:"number",value:a.temperature,onChange:e=>n({temperature:parseFloat(e.target.value)}),className:"w-32 rounded-md",min:0,max:2,step:.1})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"System Prompt"}),(0,t.jsx)("textarea",{value:a.prompts.systemPrompt,onChange:e=>n({prompts:{...a.prompts,systemPrompt:e.target.value}}),rows:4,className:"w-full rounded-md"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Additional Instructions"}),(0,t.jsx)("textarea",{value:a.prompts.additionalInstructions,onChange:e=>n({prompts:{...a.prompts,additionalInstructions:e.target.value}}),rows:2,className:"w-full rounded-md"})]})]})]})}function I(e){let{models:s={},defaultModel:a="anthropic",onUpdate:n}=e,[i,r]=(0,l.useState)(a),[o,d]=(0,l.useState)(!1),c=(e,a)=>{n({...s,[e]:{...s[e],...a}})};return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsx)(w,{models:s,activeTab:i,onTabChange:r}),i&&s[i]&&(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("input",{type:"checkbox",checked:s[i].enabled,onChange:e=>c(i,{enabled:e.target.checked}),className:"rounded text-primary focus:ring-primary"}),(0,t.jsxs)("label",{className:"text-sm font-medium text-gray-900",children:["Enable ",i.charAt(0).toUpperCase()+i.slice(1)]})]}),(0,t.jsx)("button",{onClick:()=>d(!o),className:"text-sm text-primary hover:text-primary-dark",children:o?"Hide Advanced":"Show Advanced"})]}),(0,t.jsx)(S,{modelId:i,config:s[i],onUpdate:e=>c(i,e),showAdvanced:o})]})]})}function E(e){let{models:s={},defaultModel:a="anthropic",onUpdate:l}=e,n=(e,a)=>{l({...s,[e]:{...s[e]||v[e].defaultConfig,...a}})};return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"bg-blue-50 p-4 rounded-lg",children:[(0,t.jsx)("h3",{className:"text-sm font-medium text-blue-900 mb-2",children:"Available Models"}),(0,t.jsx)("div",{className:"grid gap-3",children:Object.entries(v).map(e=>{var a,l,i;let[r,{name:o,description:d}]=e;return(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-medium text-blue-900",children:o}),(0,t.jsx)("p",{className:"text-sm text-blue-700",children:d})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("input",{type:"checkbox",checked:null!==(i=null===(a=s[r])||void 0===a?void 0:a.enabled)&&void 0!==i&&i,onChange:e=>n(r,{enabled:e.target.checked}),className:"rounded text-primary focus:ring-primary"}),(0,t.jsx)("span",{className:"text-sm text-blue-700",children:(null===(l=s[r])||void 0===l?void 0:l.enabled)?"Enabled":"Disabled"})]})]},r)})})]}),(0,t.jsx)(I,{models:s,defaultModel:a,onUpdate:l})]})}var P=a(767),T=a(6113);function U(e){let{isOpen:s,onClose:a,onConnect:n}=e,[i,r]=(0,l.useState)(null),o=async e=>{r(e);try{await n(e)}finally{r(null),a()}};return s?(0,t.jsx)("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50",children:(0,t.jsxs)("div",{className:"bg-white rounded-lg w-full max-w-md p-6",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold text-gray-900",children:"Connect Email Account"}),(0,t.jsx)("button",{onClick:a,className:"text-gray-400 hover:text-gray-600",children:(0,t.jsx)(P.A,{className:"w-6 h-6"})})]}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("button",{onClick:()=>o("microsoft"),disabled:!!i,className:"w-full flex items-center gap-3 p-4 bg-[#f3f6fc] hover:bg-[#e9ecf5] rounded-lg group transition-colors",children:[(0,t.jsx)("div",{className:"w-12 h-12 bg-[#05a6f0] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform",children:"microsoft"===i?(0,t.jsx)(A.A,{className:"w-6 h-6 text-white animate-spin"}):(0,t.jsx)(T.u,{className:"w-6 h-6 text-white"})}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-900",children:"Microsoft 365"}),(0,t.jsx)("p",{className:"text-sm text-gray-500",children:"Connect Outlook or Office 365 account"})]})]}),(0,t.jsxs)("button",{onClick:()=>o("google"),disabled:!!i,className:"w-full flex items-center gap-3 p-4 bg-[#f8f9fa] hover:bg-[#f1f3f4] rounded-lg group transition-colors",children:[(0,t.jsx)("div",{className:"w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform",children:"google"===i?(0,t.jsx)(A.A,{className:"w-6 h-6 animate-spin"}):(0,t.jsx)(d.A,{className:"w-6 h-6 text-gray-600"})}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-900",children:"Google"}),(0,t.jsx)("p",{className:"text-sm text-gray-500",children:"Connect Gmail or Google Workspace account"})]})]})]})]})}):null}var D=a(853),L=a(3473),_=a(2402),M=a(5686);function K(e){let{excludedEmails:s,onAdd:a,onRemove:n}=e,[i,r]=(0,l.useState)(""),[o,d]=(0,l.useState)(""),[c,m]=(0,l.useState)(""),u=s.filter(e=>{var s;return e.email.toLowerCase().includes(c.toLowerCase())||(null===(s=e.reason)||void 0===s?void 0:s.toLowerCase().includes(c.toLowerCase()))});return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:"Excluded Emails"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(D.A,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"}),(0,t.jsx)("input",{type:"text",placeholder:"Search exclusions...",value:c,onChange:e=>m(e.target.value),className:"pl-9 pr-4 py-2 border rounded-md text-sm"})]})]}),(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault(),i&&(a(i,o),r(""),d(""))},className:"flex gap-3",children:[(0,t.jsx)("input",{type:"email",placeholder:"Email address to exclude",value:i,onChange:e=>r(e.target.value),className:"flex-1 rounded-md border-gray-300",required:!0}),(0,t.jsx)("input",{type:"text",placeholder:"Reason (optional)",value:o,onChange:e=>d(e.target.value),className:"flex-1 rounded-md border-gray-300"}),(0,t.jsxs)("button",{type:"submit",className:"px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center gap-2",children:[(0,t.jsx)(L.A,{className:"w-4 h-4"}),"Add"]})]}),(0,t.jsx)("div",{className:"bg-white rounded-lg border divide-y",children:0===u.length?(0,t.jsx)("div",{className:"p-4 text-center text-gray-500",children:"No excluded emails found"}):u.map(e=>(0,t.jsxs)("div",{className:"p-4 flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(_.A,{className:"w-5 h-5 text-red-500"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-medium text-gray-900",children:e.email}),e.reason&&(0,t.jsx)("p",{className:"text-sm text-gray-500",children:e.reason}),(0,t.jsxs)("p",{className:"text-xs text-gray-400",children:["Added ",new Date(e.addedAt).toLocaleDateString()," by ",e.addedBy]})]})]}),(0,t.jsx)("button",{onClick:()=>n(e.id),className:"text-gray-400 hover:text-red-500",children:(0,t.jsx)(M.A,{className:"w-4 h-4"})})]},e.id))})]})}var O=a(6889),F=a(9270);function G(e){let{settings:s,onUpdate:a}=e;return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(O.A,{className:"w-5 h-5 text-primary"}),(0,t.jsx)("h3",{className:"text-lg font-medium",children:"Email Delay Settings"})]}),(0,t.jsx)("button",{className:"text-gray-500 hover:text-gray-700",title:"Learn more about email delay",children:(0,t.jsx)(F.A,{className:"w-5 h-5"})})]}),(0,t.jsxs)("div",{className:"bg-blue-50 p-4 rounded-lg",children:[(0,t.jsx)("h4",{className:"text-sm font-medium text-blue-900 mb-2",children:"What is Email Delay?"}),(0,t.jsx)("p",{className:"text-sm text-blue-700",children:"Email delay adds a buffer time between AI processing and sending emails. This gives you time to review and modify AI-generated responses before they're sent. It's particularly useful for:"}),(0,t.jsxs)("ul",{className:"mt-2 space-y-1 text-sm text-blue-700 list-disc list-inside",children:[(0,t.jsx)("li",{children:"Ensuring accuracy of AI responses"}),(0,t.jsx)("li",{children:"Making last-minute adjustments"}),(0,t.jsx)("li",{children:"Preventing accidental sends"}),(0,t.jsx)("li",{children:"Maintaining quality control"})]})]}),(0,t.jsxs)("div",{className:"grid gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Delay Duration (minutes)"}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("input",{type:"number",min:0,max:1440,value:s.replyDelay,onChange:e=>a({replyDelay:parseInt(e.target.value)}),className:"w-24 rounded-md"}),(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"minutes"})]}),(0,t.jsx)("p",{className:"mt-1 text-sm text-gray-500",children:"Set to 0 for immediate sending"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 p-3 bg-yellow-50 rounded-lg",children:[(0,t.jsx)("div",{className:"p-2 bg-yellow-100 rounded-full",children:(0,t.jsx)(O.A,{className:"w-4 h-4 text-yellow-700"})}),(0,t.jsxs)("p",{className:"text-sm text-yellow-700",children:["Current delay: ",0===s.replyDelay?"No delay":"".concat(s.replyDelay," minutes")]})]})]})]})}function B(e){let{settings:s,onUpdate:a}=e,[n,i]=(0,l.useState)(!1),r=async e=>{console.log("Connecting to ".concat(e,"...")),i(!1)};return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(G,{settings:s,onUpdate:a}),(0,t.jsx)(K,{excludedEmails:s.excludedEmails||[],onAdd:(e,t)=>{let l={id:crypto.randomUUID(),email:e,reason:t,addedAt:new Date,addedBy:s.userId||"unknown"};a({excludedEmails:[...s.excludedEmails||[],l]})},onRemove:e=>{a({excludedEmails:(s.excludedEmails||[]).filter(s=>s.id!==e)})}}),(0,t.jsx)(U,{isOpen:n,onClose:()=>i(!1),onConnect:r})]})}function z(e){let{settings:s,onUpdate:a}=e;return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"text-lg font-medium text-gray-900 mb-4",children:"Security Settings"}),(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Two-Factor Authentication"}),(0,t.jsxs)("div",{className:"mt-2 flex items-center gap-4",children:[(0,t.jsx)("button",{className:"px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark",children:"Enable 2FA"}),(0,t.jsx)("span",{className:"text-sm text-gray-500",children:"Protect your account with an additional layer of security"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Session Management"}),(0,t.jsx)("div",{className:"mt-2",children:(0,t.jsx)("button",{className:"text-red-600 hover:text-red-700 text-sm font-medium",children:"Sign out of all other sessions"})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"API Access"}),(0,t.jsx)("div",{className:"mt-2",children:(0,t.jsx)("button",{className:"px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm",children:"Generate New API Key"})})]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"text-lg font-medium text-gray-900 mb-4",children:"Access Logs"}),(0,t.jsx)("div",{className:"bg-gray-50 rounded-lg p-4",children:(0,t.jsx)("div",{className:"space-y-3",children:[{event:"Login from new device",time:"2 hours ago",location:"London, UK"},{event:"Password changed",time:"3 days ago",location:"Paris, FR"},{event:"API key generated",time:"1 week ago",location:"New York, US"}].map((e,s)=>(0,t.jsxs)("div",{className:"flex items-center justify-between py-2",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-sm font-medium text-gray-900",children:e.event}),(0,t.jsx)("p",{className:"text-xs text-gray-500",children:e.location})]}),(0,t.jsx)("span",{className:"text-xs text-gray-400",children:e.time})]},s))})})]})]})}var R=a(1773),W=a(6099),q=a(6744);function H(e){let{config:s,onUpdate:a}=e,[n,i]=(0,l.useState)(!1),r=async()=>{i(!0);try{await new Promise(e=>setTimeout(e,1500))}finally{i(!1)}};return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(u.A,{className:"w-5 h-5 text-primary"}),(0,t.jsx)("h2",{className:"text-lg font-medium",children:"Database Configuration"})]}),(0,t.jsx)("button",{onClick:r,disabled:n,className:"px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2",children:n?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(R.A,{className:"w-4 h-4 animate-spin"}),"Initializing..."]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(W.A,{className:"w-4 h-4"}),"Initialize Database"]})})]}),(0,t.jsxs)("div",{className:"grid gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Database URL"}),(0,t.jsx)("input",{type:"text",value:s.url,onChange:e=>a({url:e.target.value}),className:"w-full rounded-md",placeholder:"postgres://user:pass@host:5432/dbname"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Database Key"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("input",{type:"password",value:s.key,onChange:e=>a({key:e.target.value}),className:"flex-1 rounded-md",placeholder:"your-database-key"}),(0,t.jsx)("button",{className:"p-2 text-gray-400 hover:text-gray-600",children:(0,t.jsx)(q.A,{className:"w-5 h-5"})})]})]})]}),(0,t.jsxs)("div",{className:"bg-blue-50 p-4 rounded-lg",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-blue-700 mb-2",children:[(0,t.jsx)(y.A,{className:"w-5 h-5"}),(0,t.jsx)("h3",{className:"font-medium",children:"Database Schema"})]}),(0,t.jsxs)("div",{className:"space-y-2 text-sm text-blue-600",children:[(0,t.jsx)("p",{children:"The following tables will be created:"}),(0,t.jsxs)("ul",{className:"list-disc list-inside space-y-1",children:[(0,t.jsx)("li",{children:"emails - Store email data and metadata"}),(0,t.jsx)("li",{children:"embeddings - Vector embeddings for AI training"}),(0,t.jsx)("li",{children:"email_templates - Reusable email templates"}),(0,t.jsx)("li",{children:"token_usage - Track AI token consumption"}),(0,t.jsx)("li",{children:"user_settings - User preferences and configurations"})]})]})]})]})}var Y=a(5440),J=a(865);let V=[{id:"microsoft365",name:"Microsoft 365",description:"Connect your Outlook or Office 365 account",category:"email",icon:"/microsoft.svg",popular:!0},{id:"gmail",name:"Gmail",description:"Connect your Gmail or Google Workspace account",category:"email",icon:"/gmail.svg",popular:!0},{id:"openai",name:"OpenAI",description:"Connect to OpenAI API for advanced AI capabilities",category:"ai",icon:"/openai.svg",popular:!0},{id:"anthropic",name:"Anthropic",description:"Use Claude for enhanced language processing",category:"ai",icon:"/anthropic.svg",popular:!0},{id:"deepseek",name:"DeepSeek",description:"Advanced AI model integration",category:"ai",icon:"/deepseek.svg"},{id:"gemini",name:"Google Gemini",description:"Google's latest AI model integration",category:"ai",icon:"/gemini.svg"}];function X(){let[e,s]=(0,l.useState)(""),[a,n]=(0,l.useState)(null),[i,r]=(0,l.useState)([]),o=V.filter(s=>{let t=s.name.toLowerCase().includes(e.toLowerCase())||s.description.toLowerCase().includes(e.toLowerCase()),l=!a||s.category===a;return t&&l}),d=async e=>{await new Promise(e=>setTimeout(e,1e3)),r(s=>[...s,e])},m=async e=>{await new Promise(e=>setTimeout(e,1e3)),r(s=>s.filter(s=>s!==e))};return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(c.A,{className:"w-5 h-5 text-primary"}),(0,t.jsx)("h2",{className:"text-lg font-medium",children:"Integrations"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(D.A,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"}),(0,t.jsx)("input",{type:"text",placeholder:"Search integrations...",value:e,onChange:e=>s(e.target.value),className:"pl-9 pr-4 py-2 border rounded-md"})]}),(0,t.jsxs)("select",{value:a||"",onChange:e=>n(e.target.value||null),className:"border rounded-md px-3 py-2",children:[(0,t.jsx)("option",{value:"",children:"All Categories"}),(0,t.jsx)("option",{value:"email",children:"Email"}),(0,t.jsx)("option",{value:"ai",children:"AI Models"})]})]})]}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:o.map(e=>(0,t.jsx)("div",{className:"p-4 border rounded-lg hover:border-primary transition-colors",children:(0,t.jsxs)("div",{className:"flex items-start gap-4",children:[(0,t.jsx)("div",{className:"w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center",children:(0,t.jsx)(Y.A,{className:"w-6 h-6 text-gray-600"})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-900",children:e.name}),e.popular&&(0,t.jsxs)("span",{className:"flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full",children:[(0,t.jsx)(J.A,{className:"w-3 h-3"}),"Popular"]})]}),(0,t.jsx)("p",{className:"text-sm text-gray-600 mt-1",children:e.description}),(0,t.jsx)("button",{onClick:()=>i.includes(e.id)?m(e.id):d(e.id),className:"mt-3 px-4 py-2 rounded-md text-sm font-medium ".concat(i.includes(e.id)?"bg-red-50 text-red-600 hover:bg-red-100":"bg-primary text-white hover:bg-primary-dark"),children:i.includes(e.id)?"Disconnect":"Connect"})]})]})},e.id))})]})}var Z=a(1084);async function Q(e){let s=(0,f.U)();if(!s)throw Error("Failed to initialize Supabase client");let{data:{user:a}}=await s.auth.getUser();if(!a)throw Error("User not authenticated");try{var t,l;let{error:n}=await s.from("user_settings").upsert({user_id:a.id,email_settings:{...e.emailSettings,models:void 0,defaultModel:void 0},branding:e.branding,ai_models:(null===(t=e.emailSettings)||void 0===t?void 0:t.models)||N(),default_ai_model:(null===(l=e.emailSettings)||void 0===l?void 0:l.defaultModel)||"anthropic",updated_at:new Date().toISOString()},{onConflict:"user_id"});if(n)throw n;Z.v.info("Settings saved successfully")}catch(e){throw Z.v.error("Failed to save settings:",e),e}}async function $(){let e=(0,f.U)();if(!e)throw Error("Failed to initialize Supabase client");let{data:{user:s}}=await e.auth.getUser();if(!s)return Z.v.warn("No authenticated user found"),null;try{let{data:a,error:t}=await e.from("user_settings").select("*").eq("user_id",s.id).single();if(t)throw t;if(!a)return Z.v.warn("No settings found for user"),null;return{openaiApiKey:"",anthropicApiKey:"",emailSettings:{...a.email_settings,models:a.ai_models||N(),defaultModel:a.default_ai_model||"anthropic"},branding:a.branding||{logoUrl:null,primaryColor:"#014380",secondaryColor:"#014584",companyName:"",emailSignature:""},microsoftClientId:"",microsoftTenantId:"",supabaseConfig:{url:"",key:"",embeddingsTable:"embeddings"}}}catch(e){throw Z.v.error("Failed to load settings:",e),e}}let ee={emailSettings:{tone:"formal",language:"en",signature:"",replyDelay:0,excludedEmails:[],aiRules:{enabled:!1,allowedSenders:[],excludedSenders:[],keywords:[],maxTokensPerEmail:2e3,monthlyTokenBudget:1e5,processRules:{processAll:!0,processFromList:!1,processWithKeywords:!1}},tokenUsage:{currentMonthTokens:0,monthlyLimit:1e5,costPerThousandTokens:.02},models:{anthropic:{enabled:!0,apiKey:"",maxTokens:2e3,temperature:.7,prompts:{systemPrompt:"",additionalInstructions:""}}},defaultModel:"anthropic"},microsoftClientId:"",microsoftTenantId:"",supabaseConfig:{url:"",key:"",embeddingsTable:"embeddings"},branding:{logoUrl:null,primaryColor:"#014380",secondaryColor:"#014584",companyName:"",emailSignature:""},openaiApiKey:"",anthropicApiKey:""};function es(){let[e,s]=(0,l.useState)("ai-models"),[a,n]=(0,l.useState)(ee),[r,o]=(0,l.useState)(!1);(0,l.useEffect)(()=>{$().then(e=>{e&&n(e)}).catch(console.error)},[]);let d=async e=>{let s={...a,...e};n(s),o(!0);try{await Q(s)}catch(e){console.error("Failed to save settings:",e)}finally{o(!1)}};return(0,t.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,t.jsx)(i,{}),(0,t.jsx)("div",{className:"container mx-auto px-4 py-8",children:(0,t.jsxs)("div",{className:"flex gap-8",children:[(0,t.jsx)(x,{activeSection:e,onSectionChange:s}),(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsxs)("div",{className:"bg-white rounded-lg shadow-sm p-6",children:[r&&(0,t.jsx)("div",{className:"mb-4 text-sm text-blue-600",children:"Saving changes..."}),"general"===e&&(0,t.jsx)(g,{settings:a,onUpdate:d}),"branding"===e&&(0,t.jsx)(b,{config:a.branding,onUpdate:e=>d({branding:e})}),"ai-models"===e&&(0,t.jsx)(E,{models:a.emailSettings.models,defaultModel:a.emailSettings.defaultModel,onUpdate:(e,s)=>d({emailSettings:{...a.emailSettings,models:e,...s&&{defaultModel:s}}})}),"email"===e&&(0,t.jsx)(B,{settings:a.emailSettings,onUpdate:e=>d({emailSettings:{...a.emailSettings,...e}})}),"integrations"===e&&(0,t.jsx)(X,{}),"security"===e&&(0,t.jsx)(z,{settings:a,onUpdate:d}),"database"===e&&(0,t.jsx)(H,{config:a.supabaseConfig,onUpdate:e=>d({supabaseConfig:{...a.supabaseConfig,...e}})})]})})]})})]})}},2925:(e,s,a)=>{"use strict";a.d(s,{Jo:()=>o,x:()=>i});var t=a(5155),l=a(3749),n=a(2115);let i=(0,l.vt)(e=>({emails:[],drafts:[],settings:{tone:"formal",language:"en",signature:"",replyDelay:0,excludedEmails:[],branding:{logoUrl:null,primaryColor:"#014380",secondaryColor:"#014584",companyName:"",emailSignature:""},aiRules:{enabled:!1,allowedSenders:[],excludedSenders:[],keywords:[],maxTokensPerEmail:2e3,monthlyTokenBudget:1e5,processRules:{processAll:!0,processFromList:!1,processWithKeywords:!1}},tokenUsage:{currentMonthTokens:0,monthlyLimit:1e5,costPerThousandTokens:.02},models:{anthropic:{enabled:!0,apiKey:"",maxTokens:2e3,temperature:.7,prompts:{systemPrompt:"",additionalInstructions:""}}},defaultModel:"anthropic"},setEmails:s=>e({emails:s}),addDraft:s=>e(e=>({drafts:[...e.drafts,s]})),updateDraft:(s,a)=>e(e=>({drafts:e.drafts.map(e=>e.id===s?a:e)})),approveDraft:s=>e(e=>({drafts:e.drafts.filter(e=>e.id!==s),emails:[...e.emails,e.drafts.find(e=>e.id===s)]})),deleteDraft:s=>e(e=>({drafts:e.drafts.filter(e=>e.id!==s)})),updateSettings:s=>e({settings:s})})),r=(0,n.createContext)(null);function o(e){let{children:s}=e,a=i();return(0,t.jsx)(r.Provider,{value:a,children:s})}},1084:(e,s,a)=>{"use strict";a.d(s,{v:()=>l});class t{logToConsole(e){let s="[".concat(e.timestamp,"] [").concat(e.level.toUpperCase(),"]");switch(e.level){case"debug":e.data?console.log(s,e.message,e.data):console.log(s,e.message);break;case"info":e.data?console.info(s,e.message,e.data):console.info(s,e.message);break;case"warn":e.data?console.warn(s,e.message,e.data):console.warn(s,e.message);break;case"error":e.data?console.error(s,e.message,e.data):console.error(s,e.message)}}createLogEntry(e,s,a){return{level:e,message:s,data:a,timestamp:new Date().toISOString()}}debug(e,s){this.logToConsole(this.createLogEntry("debug",e,s))}info(e,s){this.logToConsole(this.createLogEntry("info",e,s))}warn(e,s){this.logToConsole(this.createLogEntry("warn",e,s))}error(e,s){this.logToConsole(this.createLogEntry("error",e,s))}}let l=new t},7776:(e,s,a)=>{"use strict";a.d(s,{U:()=>r});var t=a(2600),l=a(1084),n=a(2818);let i=null;function r(){let e=n.env.NEXT_PUBLIC_SUPABASE_URL,s=n.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;return e&&s?(i||(i=(0,t.kT)(e,s)),i):(l.v.warn("Supabase credentials not found, using mock client"),{auth:{getSession:async()=>({data:{session:null},error:null}),getUser:async()=>({data:{user:null},error:null}),signInWithOAuth:async()=>({data:null,error:null}),signInWithPassword:async()=>({data:null,error:null}),signUp:async()=>({data:null,error:null}),signOut:async()=>({error:null}),onAuthStateChange:()=>({data:{subscription:{unsubscribe:()=>{}}}})},storage:{createBucket:async()=>({data:null,error:null}),from:()=>({upload:async()=>({data:{path:""},error:null}),getPublicUrl:()=>({data:{publicUrl:""}}),remove:async()=>({error:null})})},from:e=>({select:e=>({single:async()=>({data:null,error:null}),eq:()=>({data:[],error:null})}),insert:async s=>(l.v.info("Mock inserting into ".concat(e,":"),s),{data:Array.isArray(s)?s:[s],error:null}),upsert:async e=>({data:e,error:null})})})}}},e=>{var s=s=>e(e.s=s);e.O(0,[705,869,441,517,358],()=>s(1948)),_N_E=e.O()}]);