import { Kafka, logLevel } from "kafkajs";

export const kafka =new Kafka({
    clientId:"auth",
    brokers:['localhost:9092'],
    logLevel: logLevel.ERROR


})