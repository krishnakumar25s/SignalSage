"use client";

import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BotIcon } from '@/components/app/icons';
import { Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAIResponse, getChatHistory, Message } from '@/app/actions';
import { useLanguage } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '../ui/skeleton';

export function AIChat() {
    const { t } = useLanguage();
    const { user } = useAuth();
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        async function loadHistory() {
            if (!user) return;
            setIsHistoryLoading(true);
            try {
                const history = await getChatHistory(user.uid);
                if (history.length === 0) {
                    setMessages([{ id: 'welcome', role: 'assistant', content: t.welcomeMessage }]);
                } else {
                    setMessages(history);
                }
            } catch (error) {
                 setMessages([{ id: 'welcome', role: 'assistant', content: t.welcomeMessage }]);
            } finally {
                setIsHistoryLoading(false);
            }
        }
        loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(currentInput, user.uid);
      // Instead of just adding the AI response, we refetch the history to get the server-timestamped messages
      const updatedHistory = await getChatHistory(user.uid);
      setMessages(updatedHistory);
    } catch (error) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: t.aiError };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card className="shadow-lg h-full flex flex-col max-h-[75vh]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <BotIcon className="h-7 w-7 text-primary" />
          {t.AINanban}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-6 space-y-4">
            {isHistoryLoading ? (
                 <div className="space-y-4">
                    <Skeleton className="h-16 w-3/4" />
                    <Skeleton className="h-16 w-3/4 ml-auto" />
                    <Skeleton className="h-16 w-3/4" />
                 </div>
            ) : (
                messages.map((message) => (
                <div
                    key={message.id}
                    className={cn(
                    'flex items-start gap-4',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                >
                    {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback>
                            <BotIcon className='h-5 w-5' />
                        </AvatarFallback>
                    </Avatar>
                    )}
                    <div
                    className={cn(
                        'max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl whitespace-pre-wrap',
                        message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                    >
                    {message.content}
                    </div>
                    {message.role === 'user' && (
                    <Avatar className="h-8 w-8 border-2 border-accent">
                        <AvatarFallback>
                            <User className='h-5 w-5' />
                        </AvatarFallback>
                    </Avatar>
                    )}
                </div>
                ))
            )}
            {isLoading && (
              <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback>
                        <BotIcon className='h-5 w-5' />
                    </AvatarFallback>
                </Avatar>
                <div className="max-w-lg px-4 py-3 rounded-2xl bg-muted text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-6">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            id="message"
            placeholder={t.typeYourMessage}
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || !user || isHistoryLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim() || !user} className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
            <span className="sr-only">{t.Send}</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
