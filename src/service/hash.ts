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
    throw new Error("Error in Encryption")
  }
};

const decryptPassword = async (password: string, hashedPassword: string) => {
  try {
    
    if(!password || !hashedPassword){
      throw new Error("No password provided")
    };

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if(!isPasswordCorrect){
      return false;
    };

    return isPasswordCorrect;

  } catch (error) {
    console.log(error);
    throw new Error("Error in Decryption")
  }
};

export { encryptPassword, decryptPassword };