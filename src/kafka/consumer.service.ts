import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:29092'],
  });

  private readonly consumers: Consumer[] = [];

  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    console.log('topics:', topics);
    const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });
    await consumer.connect();
    await consumer.subscribe(topics);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  constructor() {
    console.log('ConsumerService created...');
  }

  async onApplicationShutdown(signal?: string) {
    await Promise.all(this.consumers.map((consumer) => consumer.disconnect()));
    console.log('Consumers disconnected...', signal);
  }
}
