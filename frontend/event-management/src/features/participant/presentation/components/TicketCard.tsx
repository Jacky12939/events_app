// import QRCode from "react-qr-code";
// import type { Registration } from "../../domain/entities/registration";
// // 1. On importe l'entité Registration pour remplacer le "any"

// interface Props {
//   ticket: Registration; // Remplacement de any par le type strict
// }

// const TicketCard = ({ ticket }: Props) => {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
//       <h2 className="text-2xl font-bold mb-4">
//         {ticket.event.title}
//       </h2>

//       <p className="text-gray-600 dark:text-gray-300">
//         <span className="font-semibold">Date :</span>{" "}
//         {/* On utilise ticket.event.startDate ou ticket.event.date selon votre entité */}
//         {new Date(ticket.event.startDate).toLocaleString()}
//       </p>

//       <p className="text-gray-600 dark:text-gray-300 mt-1">
//         <span className="font-semibold">Lieu :</span>{" "}
//         {ticket.event.location}
//       </p>

//       <div className="mt-6 flex flex-col items-center justify-center gap-4">
//         {/* Le QRCode génère visuellement le code du ticket */}
//         <div className="p-3 bg-white rounded-lg border shadow-sm">
//           <QRCode
//             value={ticket.ticketCode} // On utilise le code unique du ticket pour le scanner
//             size={180}
//           />
//         </div>
        
//         <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
//           {ticket.ticketCode}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TicketCard;