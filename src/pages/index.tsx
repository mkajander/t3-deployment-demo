import type {NextPage} from "next";
import Head from "next/head";
import {trpc} from "../utils/trpc";
import Image from "next/future/image";
import React from "react";

type TechnologyCardProps = {
    name: string;
    description: string;
    documentation: string;
};

const Home: NextPage = () => {
    const [message, setMessage] = React.useState("");
    const {
        data: messages,
        refetch,
        isLoading,
    } = trpc.useQuery(["message.getAll"], {
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });
    const sendMessageMutation = trpc.useMutation(["message.create"]);
    const handleSendMessage = async () => {
        await sendMessageMutation.mutateAsync({
            text: message,
        })
        setMessage("");
        await refetch();
    };
    const getMessages = async () => {
        const messages = await trpc.useQuery(["message.getAll"]);
    }
    const sendingMessage = sendMessageMutation.isLoading || isLoading;


    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Team demo"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <header className="bg-indigo-600">
            </header>
            <main className="container mx-auto flex flex-col items-center justify-center p-4">
                {/* Input field to create a new message */}
                <div className="space-y-8 divide-y divide-gray-200">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">New message</label>
                        <div className="mt-1">
                            <input type="text" name="message" id="message" onChange={(e) => setMessage(e.target.value)}
                                   value={message}
                                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                   placeholder="Your message"/>
                        </div>
                    </div>
                    <button type="submit" onClick={handleSendMessage} disabled={sendingMessage}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Send
                    </button>
                </div>
                {/* List of messages, props are text and createdAt */}
                <div className="mt-20 space-y-8 divide-y divide-gray-200">
                    {messages?.map((message) => (
                        <div key={message.id}>
                            <div className="flex items-center space-x-5">
                                <div className="flex-shrink-0">
                                    <p className="text-sm font-medium text-gray-900">{message.text}</p>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-500">{message.createdAt.toUTCString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </main>
        </>
);
};

export default Home;
