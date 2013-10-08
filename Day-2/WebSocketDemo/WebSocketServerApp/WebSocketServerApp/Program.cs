using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebSocketServerApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var server = new WebSocketServer("ws://localhost:9090/SocketServer");
            List<IWebSocketConnection> connections = new List<IWebSocketConnection>();
            server.Start(conn => {
                conn.OnOpen = () =>
                {
                    Console.WriteLine("A new connection is established");
                    connections.Add(conn);
                };
                conn.OnClose = () =>
                {
                    Console.WriteLine("An existing connection is closed");
                    connections.Remove(conn);
                };
                conn.OnMessage = (s) =>
                {
                    Console.WriteLine("Message received - {0}", s);
                    foreach (var connection in connections)
                    {
                        if (connection.IsAvailable && conn != connection)
                            connection.Send(s);
                    }
                };
            });
            Console.WriteLine("Type any message to send to client, OR Exit to shutdown");
            var input = string.Empty;
            while ((input = Console.ReadLine()).ToUpper() != "EXIT")
            {
                foreach (var connection in connections)
                {
                    if (connection.IsAvailable)
                        connection.Send(input);
                }
            }

        }
    }
}
