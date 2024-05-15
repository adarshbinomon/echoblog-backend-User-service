import { kafka } from "../config/kafkaClient";
import { changeUserStatusController } from "../libs/controller/consumeControllers";
import { Dependencies } from "../utils/interfaces/dependency.interface";

const consumer = kafka.consumer({
  groupId: "auth-service-2",
});

export const updateUserStatusConsumer = async (dependencies: Dependencies) => {
  try {
    console.log("consuming from user service");

    await consumer.connect();
    await consumer.subscribe({
      topic: "changeUserStatus",
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          console.log('message recieved form user service');
          
          const binaryData: any = message.value;
          const jsonString: string = binaryData?.toString();
          const jsonData = JSON.parse(jsonString);
          const messageType = jsonData?.type;

          if (messageType === "statuschange") {
            await changeUserStatusController(dependencies, jsonData.data);
          } else {
            console.log("Unhandled message type:", messageType);
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      },
    });
  } catch (error) {
    console.error("Error in auth consumer", error);
  }
};
