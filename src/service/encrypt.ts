import bcrypt from "bcryptjs";

const encryptPassword = async (password: string) => {
  try {
    
    if(!password){
      throw new Error("No password provided");
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;

  } catch (error) {
    console.log(error);
  }
};

export { encryptPassword };