import { decryptPassword, encryptPassword } from "../service/hash";
import { createToken } from "../service/token";
import { asyncHandler } from "../utils/asyncHandler";
import prisma from "../utils/db";
import { loginUserValidation, registerUserValidation } from "../validations/user.validation";

const registerUser = asyncHandler( async (req, res) => {

  const input = registerUserValidation.safeParse(req.body);
  if(!input.success){
    return res.status(400).json({
      message: "Invalid Input",
      error: input.error.errors
    });
  };

  const hashedPassword = await encryptPassword(input.data.password);
  if(!hashedPassword){
    return res.status(400).json({
      message: "Error input.success hashing password"
    });
  };

  const newUser = await prisma.user.create({
    data: {
      name: input.data.name,
      email: input.data.email,
      password: hashedPassword,
      role: input.data.role
    }
  });

  if(!newUser){
    return res.status(400).json({
      message: "Error input.success Registration"
    })
  };

  return res.status(201).json({
    message: "User Registered Successfully"
  });
  
});

const loginUser = asyncHandler( async (req, res) => {

  const input = loginUserValidation.safeParse(req.body);
  if(!input.success){
    return res.status(400).json({
      message: "Invalid Input",
      error: input.error.errors
    })
  };

  const user = await prisma.user.findUnique({
    where: { 
      email: input.data?.email 
    },
  });

  if(!user){
    return res.status(404).json({
      mesage: "Email Not Found"
    })
  };


  const isPasswordCorrect = await decryptPassword(input.data?.password, user.password);
  if(!isPasswordCorrect){
    return res.status(403).json({
      message: "Incorrect Password"
    });
  };

  const token = createToken(user);

  return res.status(200).json({
    message: "Login successfull",
    token
  });
});

export {
  registerUser,
  loginUser
};