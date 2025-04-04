import jwt from "jsonwebtoken";

interface tokenData {
  id: number;
  name: string;
  email: string;
  role: string
};

export const createToken =  (data: tokenData) => {
  
  const { id, name, email, role} = data;
  
  if(!process.env.JWT_SECRET){
    throw new Error("No JWT Secret Provided");
  };

  const token = jwt.sign({ id, name, email, role }, process.env.JWT_SECRET as string, { expiresIn: "24h"});

  return token;
};