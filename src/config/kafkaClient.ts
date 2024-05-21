import { Kafka, logLevel } from "kafkajs";

export const kafka =new Kafka({
    clientId:"auth",
    brokers:['demo-kafka:9092'],
    logLevel: logLevel.ERROR


})