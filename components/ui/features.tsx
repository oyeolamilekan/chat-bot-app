// // export function Features({currentView, index, triggerCurrentView, title, body }: PropTypes) {
// //   return (
// //     <div className="flex justify-start w-5/6 md:w-4/6 m-auto md:space-x-8 md:flex-row flex-col">
// //       <div className="md:w-2/5" onClick={() => triggerCurrentView(index)}>
// //         <h1 className="text-xl font-semibold my-2">{title}</h1>
// //         <div className={`${currentView === index ? 'block transition-all ease-in' : 'hidden'}`}>
// //           <p>{body}</p>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// import { ReactNode, createContext } from "react";

// // interface PropTypes {
// //   triggerCurrentView: (indeX: number) => void;
// //   currentView: number;
// //   index: number;
// //   title: string;
// //   body?: string;
// // }

// export const ChatProviderContext = createContext({})

// export default function Features({ children, initialView, currentView, ...restProps }: FeaturesPropTypes) {
//   const [currentView, setCurrentView] = useState(initialView);

//   const triggerCurrentView = (index) => {
//     setCurrentView(index);
//   };

//   return (
//     <div className="flex justify-start w-5/6 md:w-4/6 m-auto md:space-x-8 md:flex-row flex-col">
//       {children}
//     </div>
//   );
// }

// Features.title = function FeaturesTitle({ children, ...restProps }: PropTypes) {
//   return <h1 className="text-xl font-semibold my-2">{children}</h1>
// };

// Features.body = function FeaturesBody({ children, ...restProps }: PropTypes) {
//   return (
//     <div className={`${'currentView' === 'index' ? 'block transition-all ease-in' : 'hidden'}`}>
//       <p>{children}</p>
//     </div>
//   )
// };

// interface PropTypes {
//   children?: ReactNode;
// }

// interface FeaturesPropTypes extends PropTypes  {
//   children?: ReactNode;
//   initialView: number;
//   currentView: number;
// }