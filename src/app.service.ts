import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async getHello(): Promise<string> {
    console.log('Producing message...');
    await this.producerService.produce({
      topic: 'test-topic',
      messages: [{ value: 'Hello KafkaJS user!' }],
    }); // This will produce a message to the Kafka topic 'test-topic'
    return 'Hello World!';
  }
}
