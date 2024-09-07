import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    console.log('TestConsumer is being created !!!!!!!!');
    await this.consumerService.consume(
      { topics: ['test-topic'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log('consumer started...');
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
    console.log('TestConsumer consumed successfully !!!!!!!!');
  }
}
