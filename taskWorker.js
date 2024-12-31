const amqp = require('amqplib');

async function processTask() {
  const queue = 'taskQueue';

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });
  channel.prefetch(1); // Process one message at a time

  console.log(`[*] Waiting for tasks in ${queue}`);
  channel.consume(queue, async (msg) => {
    if (msg) {
      const task = msg.content.toString();
      console.log(`[x] Received: ${task}`);
      await new Promise((res) => setTimeout(res, 2000)); // Simulate task processing
      console.log(`[x] Done: ${task}`);
      channel.ack(msg);
    }
  });
}

processTask();
