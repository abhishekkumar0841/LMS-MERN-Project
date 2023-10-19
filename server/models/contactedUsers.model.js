import { model, Schema } from "mongoose";

const contactedUsersSchema = new Schema({
  totalUsers: [
    {
      name: {
        type: String,
        required: [true, "Your Name Is Required"],
      },
      email: {
        type: String,
        required: [true, "Your Email Is Required"],
      },
      message: {
        type: String,
        required: [true, "Message Is Required"],
      },
    },
  ],
});

const Contacted_Users = model("Contacted_Users", contactedUsersSchema);

export default Contacted_Users;
