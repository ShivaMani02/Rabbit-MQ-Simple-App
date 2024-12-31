const amqp = require('amqplib');

async function sendTask() {
  const queue = 'taskQueue';
  const tasks = ['Task 1', 'Task 2', 'Task 3'];

  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });

  tasks.forEach((task) => {
    channel.sendToQueue(queue, Buffer.from(task), { persistent: true });
    console.log(`[x] Sent: ${task}`);
  });

  await channel.close();
  await connection.close();
}

sendTask();
