import emailjs from "emailjs-com"

export const sendEmail = async (templateParams: Record<any, any>) => {
    try {
 const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!; 
 const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
 const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

 const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);

 return response

    } catch (error) {
        console.log("Failed to Send Email",error)
        throw error;
    }
    
} 