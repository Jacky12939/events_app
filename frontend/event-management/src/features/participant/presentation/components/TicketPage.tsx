// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import TicketCard from "./TicketCard";
// import { RegistrationRepositoryImpl } from "../../data/repositories/RegistrationRepositoryImpl";
// import type { Registration } from "../../domain/entities/registration";
// // 1. Importation de l'entité du domaine (avec mot-clé type obligatoire)

// const repository = new RegistrationRepositoryImpl();

// const TicketPage = () => {
//   const { registrationId } = useParams();

//   // 2. Remplacement de <any>() par le type strict ou null
//   const [ticket, setTicket] = useState<Registration | null>(null);

//   useEffect(() => {
//     // Si pas de registrationId dans l'URL, on ne tente pas de charger
//     if (!registrationId) return;

//     const loadTicket = async () => {
//       try {
//         const data = await repository.getTicket(registrationId);
//         setTicket(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération du ticket :", error);
//       }
//     };

//     loadTicket();
//   }, [registrationId]);

//   if (!ticket) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-500">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <TicketCard ticket={ticket} />
//     </div>
//   );
// };

// export default TicketPage;