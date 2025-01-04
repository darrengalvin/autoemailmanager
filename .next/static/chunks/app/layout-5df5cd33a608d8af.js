(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{1363:(e,r,t)=>{Promise.resolve().then(t.bind(t,4596)),Promise.resolve().then(t.bind(t,1349)),Promise.resolve().then(t.bind(t,8978)),Promise.resolve().then(t.t.bind(t,5786,23))},4596:(e,r,t)=>{"use strict";t.d(r,{Providers:()=>o});var s=t(5155),a=t(2115),n=t(6972);class i extends a.Component{static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,r){console.error("ErrorBoundary caught an error:",e,r)}render(){if(this.state.hasError){var e;return(0,s.jsxs)("div",{className:"p-4 bg-red-50 border border-red-200 rounded-lg",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 text-red-600 mb-2",children:[(0,s.jsx)(n.A,{className:"w-5 h-5"}),(0,s.jsx)("h2",{className:"font-semibold",children:"Something went wrong"})]}),(0,s.jsx)("p",{className:"text-red-700",children:null===(e=this.state.error)||void 0===e?void 0:e.message})]})}return this.props.children}constructor(...e){super(...e),this.state={hasError:!1}}}var l=t(2925);function o(e){let{children:r}=e;return(0,s.jsx)(i,{children:(0,s.jsx)(l.Jo,{children:r})})}},8978:(e,r,t)=>{"use strict";t.d(r,{Sidebar:()=>p});var s=t(5155),a=t(6046),n=t(6462),i=t(6967),l=t(3518),o=t(4081),c=t(6889),d=t(8236);let u=[{path:"/",icon:n.A,label:"Inbox"},{path:"/drafts",icon:o.A,label:"Drafts"},{path:"/pending",icon:c.A,label:"Pending"},{path:"/settings",icon:d.A,label:"Settings"}];var h=t(8173),m=t.n(h);function g(e){let{path:r,icon:t,label:a,isActive:n,isCollapsed:i}=e;return(0,s.jsxs)(m(),{href:r,onClick:()=>{console.group("Navigation Item Clicked"),console.log("Path:",r),console.log("Label:",a),console.log("Is Active:",n),console.log("Current Time:",new Date().toISOString()),console.groupEnd()},className:"flex items-center gap-3 p-3 rounded-md hover:bg-primary-light mb-1 transition-all duration-200 group ".concat(n?"bg-primary-light":""," ").concat(i?"justify-center w-12":""),title:i?a:void 0,children:[(0,s.jsx)("div",{className:"flex-shrink-0 ".concat(i?"w-6 h-6 flex items-center justify-center":""),children:(0,s.jsx)(t,{className:"w-5 h-5 ".concat(i?"group-hover:scale-110 transition-transform":"")})}),!i&&(0,s.jsx)("span",{className:"text-sm",children:a})]})}var f=t(2115);function p(){let e=(0,a.usePathname)(),[r,t]=(0,f.useState)(!0);return(0,s.jsxs)("aside",{className:"bg-primary text-white h-full transition-all duration-300 flex flex-col ".concat(r?"w-16":"w-64"),children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 p-4 ".concat(r?"justify-center":""),children:[(0,s.jsx)(n.A,{className:"w-8 h-8 flex-shrink-0"}),!r&&(0,s.jsx)("h1",{className:"text-xl font-bold",children:"Email Manager"})]}),(0,s.jsx)("nav",{className:"flex-1 overflow-y-auto px-2 py-4",children:u.map(t=>(0,s.jsx)(g,{...t,isActive:e===t.path,isCollapsed:r},t.path))}),(0,s.jsx)("button",{onClick:()=>t(!r),className:"p-4 hover:bg-primary-light flex items-center justify-center text-white/80 hover:text-white transition-colors border-t border-white/10",children:r?(0,s.jsx)(i.A,{className:"w-5 h-5"}):(0,s.jsxs)("div",{className:"flex items-center gap-2 w-full",children:[(0,s.jsx)(l.A,{className:"w-5 h-5"}),(0,s.jsx)("span",{className:"text-sm",children:"Collapse"})]})})]})}},1349:(e,r,t)=>{"use strict";t.d(r,{AuthStatusHeader:()=>f});var s=t(5155),a=t(6972),n=t(5236),i=t(8427),l=t(8173),o=t.n(l),c=t(2115),d=t(6046),u=t(7776),h=t(7867),m=t(1084),g=t(2925);function f(){var e;let{user:r}=function(){let e=(0,d.useRouter)(),{user:r,setUser:t,isLoading:s,setIsLoading:a,error:n,setError:i}=(0,h.n)(),l=(0,u.U)();return(0,c.useEffect)(()=>{if(!l)return;let{data:{subscription:r}}=l.auth.onAuthStateChange((r,s)=>{var n;t(null!==(n=null==s?void 0:s.user)&&void 0!==n?n:null),a(!1),"SIGNED_OUT"===r&&e.push("/auth")});return()=>r.unsubscribe()},[l,t,a,e]),{user:r,isLoading:s,error:n,signIn:async(e,r)=>{if(!l)throw Error("Supabase client not initialized");try{if(a(!0),i(null),"microsoft"===e){let{error:e}=await l.auth.signInWithOAuth({provider:"azure",options:{scopes:"email offline_access Mail.Read Mail.Send User.Read",queryParams:{prompt:"consent",domain_hint:"organizations"},redirectTo:"".concat(window.location.origin,"/auth/callback")}});if(e)throw e}else if((null==r?void 0:r.email)&&(null==r?void 0:r.password)){let{error:e}=await l.auth.signInWithPassword({email:r.email,password:r.password});if(e)throw e}}catch(e){throw m.v.error("Sign in failed:",e),i(e instanceof Error?e.message:"Authentication failed"),e}finally{a(!1)}},signOut:async()=>{if(!l)throw Error("Supabase client not initialized");try{a(!0);let{error:e}=await l.auth.signOut();if(e)throw e}catch(e){throw m.v.error("Sign out failed:",e),i(e instanceof Error?e.message:"Sign out failed"),e}finally{a(!1)}}}}(),{settings:t}=(0,g.x)(),l=null===(e=t.branding)||void 0===e?void 0:e.logoUrl;return(0,s.jsx)("div",{className:"bg-white border-b",children:(0,s.jsx)("div",{className:"container mx-auto px-4 py-3",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"flex items-center gap-4",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[l?(0,s.jsx)("img",{src:l,alt:"Logo",className:"h-8 w-auto"}):(0,s.jsx)("div",{className:"w-8 h-8 bg-gray-100 rounded flex items-center justify-center",children:(0,s.jsx)("span",{className:"text-primary font-semibold",children:"SE"})}),(0,s.jsx)("span",{className:"font-semibold text-gray-900",children:"Smart Email Manager"})]}),!r&&(0,s.jsxs)("div",{className:"flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-md text-sm",children:[(0,s.jsx)(a.A,{className:"w-4 h-4"}),(0,s.jsx)("span",{children:"Demo Mode"})]})]}),(0,s.jsx)("div",{className:"flex items-center gap-4",children:r?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"text-sm text-gray-600",children:["Signed in as ",(0,s.jsx)("span",{className:"font-medium text-gray-900",children:r.email})]}),(0,s.jsxs)("button",{className:"flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm",children:[(0,s.jsx)(n.A,{className:"w-4 h-4"}),"Sign Out"]})]}):(0,s.jsxs)(o(),{href:"/setup",className:"flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm",children:[(0,s.jsx)(i.A,{className:"w-4 h-4"}),"Connect Account"]})})]})})})}},7867:(e,r,t)=>{"use strict";t.d(r,{n:()=>n});var s=t(3749),a=t(7776);let n=(0,s.vt)(e=>({user:null,isLoading:!0,error:null,setUser:r=>e({user:r}),setIsLoading:r=>e({isLoading:r}),setError:r=>e({error:r}),signIn:async(r,t)=>{try{e({isLoading:!0,error:null});let s=(0,a.U)();if(!s)throw Error("Supabase client not initialized");let{error:n}=await s.auth.signInWithPassword({email:r,password:t});if(n)throw n}catch(r){throw e({error:r instanceof Error?r.message:"Failed to sign in"}),r}finally{e({isLoading:!1})}},signUp:async(r,t)=>{try{e({isLoading:!0,error:null});let s=(0,a.U)();if(!s)throw Error("Supabase client not initialized");let{error:n}=await s.auth.signUp({email:r,password:t,options:{emailRedirectTo:"".concat(window.location.origin,"/auth/callback")}});if(n)throw n}catch(r){throw e({error:r instanceof Error?r.message:"Failed to sign up"}),r}finally{e({isLoading:!1})}},signOut:async()=>{try{e({isLoading:!0,error:null});let r=(0,a.U)();if(!r)throw Error("Supabase client not initialized");let{error:t}=await r.auth.signOut();if(t)throw t;e({user:null})}catch(r){throw e({error:r instanceof Error?r.message:"Failed to sign out"}),r}finally{e({isLoading:!1})}},clearError:()=>e({error:null})})),i=(0,a.U)();i&&i.auth.onAuthStateChange((e,r)=>{var t;n.setState({user:null!==(t=null==r?void 0:r.user)&&void 0!==t?t:null,isLoading:!1})})},2925:(e,r,t)=>{"use strict";t.d(r,{Jo:()=>o,x:()=>i});var s=t(5155),a=t(3749),n=t(2115);let i=(0,a.vt)(e=>({emails:[],drafts:[],settings:{tone:"formal",language:"en",signature:"",replyDelay:0,excludedEmails:[],branding:{logoUrl:null,primaryColor:"#014380",secondaryColor:"#014584",companyName:"",emailSignature:""},aiRules:{enabled:!1,allowedSenders:[],excludedSenders:[],keywords:[],maxTokensPerEmail:2e3,monthlyTokenBudget:1e5,processRules:{processAll:!0,processFromList:!1,processWithKeywords:!1}},tokenUsage:{currentMonthTokens:0,monthlyLimit:1e5,costPerThousandTokens:.02},models:{anthropic:{enabled:!0,apiKey:"",maxTokens:2e3,temperature:.7,prompts:{systemPrompt:"",additionalInstructions:""}}},defaultModel:"anthropic"},setEmails:r=>e({emails:r}),addDraft:r=>e(e=>({drafts:[...e.drafts,r]})),updateDraft:(r,t)=>e(e=>({drafts:e.drafts.map(e=>e.id===r?t:e)})),approveDraft:r=>e(e=>({drafts:e.drafts.filter(e=>e.id!==r),emails:[...e.emails,e.drafts.find(e=>e.id===r)]})),deleteDraft:r=>e(e=>({drafts:e.drafts.filter(e=>e.id!==r)})),updateSettings:r=>e({settings:r})})),l=(0,n.createContext)(null);function o(e){let{children:r}=e,t=i();return(0,s.jsx)(l.Provider,{value:t,children:r})}},1084:(e,r,t)=>{"use strict";t.d(r,{v:()=>a});class s{logToConsole(e){let r="[".concat(e.timestamp,"] [").concat(e.level.toUpperCase(),"]");switch(e.level){case"debug":e.data?console.log(r,e.message,e.data):console.log(r,e.message);break;case"info":e.data?console.info(r,e.message,e.data):console.info(r,e.message);break;case"warn":e.data?console.warn(r,e.message,e.data):console.warn(r,e.message);break;case"error":e.data?console.error(r,e.message,e.data):console.error(r,e.message)}}createLogEntry(e,r,t){return{level:e,message:r,data:t,timestamp:new Date().toISOString()}}debug(e,r){this.logToConsole(this.createLogEntry("debug",e,r))}info(e,r){this.logToConsole(this.createLogEntry("info",e,r))}warn(e,r){this.logToConsole(this.createLogEntry("warn",e,r))}error(e,r){this.logToConsole(this.createLogEntry("error",e,r))}}let a=new s},7776:(e,r,t)=>{"use strict";t.d(r,{U:()=>l});var s=t(2600),a=t(1084),n=t(2818);let i=null;function l(){let e=n.env.NEXT_PUBLIC_SUPABASE_URL,r=n.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;return e&&r?(i||(i=(0,s.kT)(e,r)),i):(a.v.warn("Supabase credentials not found, using mock client"),{auth:{getSession:async()=>({data:{session:null},error:null}),getUser:async()=>({data:{user:null},error:null}),signInWithOAuth:async()=>({data:null,error:null}),signInWithPassword:async()=>({data:null,error:null}),signUp:async()=>({data:null,error:null}),signOut:async()=>({error:null}),onAuthStateChange:()=>({data:{subscription:{unsubscribe:()=>{}}}})},storage:{createBucket:async()=>({data:null,error:null}),from:()=>({upload:async()=>({data:{path:""},error:null}),getPublicUrl:()=>({data:{publicUrl:""}}),remove:async()=>({error:null})})},from:e=>({select:e=>({single:async()=>({data:null,error:null}),eq:()=>({data:[],error:null})}),insert:async r=>(a.v.info("Mock inserting into ".concat(e,":"),r),{data:Array.isArray(r)?r:[r],error:null}),upsert:async e=>({data:e,error:null})})})}},5786:()=>{}},e=>{var r=r=>e(e.s=r);e.O(0,[523,705,242,441,517,358],()=>r(1363)),_N_E=e.O()}]);