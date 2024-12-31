const amqp = require('amqplib');

async function publishMessage() {
  const queue = 'MailQueue';
  const message = 'Hello, Welcome to the Org!';

  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`[x] Sent: ${message}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

publishMessage();
