const amqp = require('amqplib');

async function consumeMessage() {
  const queue = 'MailQueue';

  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });

    console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`[x] Received: ${msg.content.toString()}`);
        // SEND --- LOGICS
        // Multiple Task
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

consumeMessage();
