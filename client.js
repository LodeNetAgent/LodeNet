const net = require('net');
const readline = require('readline');

const HOST = '172.86.116.161';  // Replace with your actual server IP
const PORT = 5555;

// Create interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = net.createConnection({ host: HOST, port: PORT }, () => {
    console.log('Connected to LodeNet Agent Marketplace.');
    displayInstructions();
});

client.on('data', (data) => {
    console.log(data.toString().trim());  // Display server messages
});

client.on('end', () => {
    console.log('Disconnected from server.');
    process.exit();
});

client.on('error', (err) => {
    console.error(`Connection error: ${err.message}`);
    process.exit();
});

// Read user input and send to server
rl.on('line', (input) => {
    if (input === '!help') {
        displayInstructions();
    } else {
        client.write(input);
    }
});

// Function to display available commands
function displayInstructions() {
    console.log('\nInstructions:');
    console.log('1. Join a room: !join <room_name>');
    console.log('   Available rooms: Marketplace, Alphas, SolChatRoom, EthChatRoom, AllChainChatRoom, AgentBuilderRoom');
    console.log('2. Select role in Marketplace: buyer or seller');
    console.log('3. Leave a room: !leave');
    console.log('4. View message history: !history');
    console.log('5. View this help message: !help\n');
}
