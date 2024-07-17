import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
  webSocket,
} from "@/Redux/Chat/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stom from "stompjs";
import { BsFillImageFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { Progress } from "@/components/ui/progress";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { auth, chat } = useSelector((s) => s);
  const { id } = useParams();
  const lastMessage = useRef();
  const [stompClient, setStompClient] = useState(null);
  const imageRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  let size = imgUrl ? 70:80

  useEffect(() => {
    const sock = new SockJS("http://localhost:9090/ws");
    const client = Stom.over(sock);

    setStompClient(client);

    const jwt = localStorage.getItem("jwt");
    const headers = {
      authorization: `Bearer ${jwt}`,
    };

    client.connect(
      headers,
      () => {
        console.log("okeeee");
        client.subscribe(`/group/${id.toString()}/private`, onMessageReceive);
      },
      onError
    );
  }, []);

  const onError = (error) => {
    console.log("not okeeee", error);
  };

  const onMessageReceive = (payload) => {
    const data = JSON.parse(payload.body);

    if (data.sender.id !== auth.user.id && !chat?.messages.includes(data)) {
      dispatch(webSocket(data));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // turn file to base64

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
    } else {
      toast.error("Please select an image file");
      setImgUrl(null);
    }
  };

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [id]);

  useEffect(() => {
    dispatch(fetchChatMessages(chat.chat?.id));
  }, [chat.chat?.id]);

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [chat?.messages]);

  const sendMessageToServer = (newMessage) => {
    stompClient.send(
      `/app/chat/${id.toString()}`,
      {},
      JSON.stringify(newMessage)
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if ((imgUrl != null && imgUrl != "")&&message) {
        dispatch(
          sendMessage({
            message: {
              senderId: auth.user?.id,
              projectId: id,
              content: "",
              img: imgUrl,
            },
            sendMessageToServer,
          })
        );
        setImgUrl("");

        dispatch(
          sendMessage({
            message: {
              senderId: auth.user?.id,
              projectId: id,
              content: message,
              img: "",
            },
            sendMessageToServer,
          })
        );
        setMessage("");
    }else if((imgUrl != null && imgUrl != "") && !message){
      dispatch(
        sendMessage({
          message: {
            senderId: auth.user?.id,
            projectId: id,
            content: "",
            img: imgUrl,
          },
          sendMessageToServer,
        })
      );
      setImgUrl("");
    }else if(message){
      dispatch(
        sendMessage({
          message: {
            senderId: auth.user?.id,
            projectId: id,
            content: message,
            img: "",
          },
          sendMessageToServer,
        })
      );
      setMessage("");
    }
    
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <form onSubmit={handleSendMessage}>
      <div className="sticky">
        <div className="border rounded-lg">
          <h1 className="border-b p-5">Chat Box</h1>
          <ScrollArea className={`h-[${size}vh] w-full p-5 flex gap-3 flex-col`}>
            {chat.loading && <Progress value={33} />}
            {!chat.loading && chat.messages?.map((item) =>
              item?.sender?.id == auth?.user.id ? (
                <div
                  ref={lastMessage}
                  key={item.id}
                  className="flex gap-2 mb-3 justify-start"
                >
                  <Avatar>
                    <AvatarFallback>{item.sender?.fullName[0]}</AvatarFallback>
                  </Avatar>
                  {item.content&&
                  <div className="space-y-1 py-1 px-4 border rounded-ss-2xl rounded-e-xl">
                    <p>{item.sender?.fullName}</p>
                    <p className="text-gray-300">{item.content}</p>
                  </div>}
                  {item.img&&
                  
                    <img src={item.img}  alt="Message Image" className="rounded-sm w-[53%] h-[53%]"/>
                  }
                </div>
              ) : (
                <div key={item} className="flex gap-2 mb-3 justify-end">
                  {item.content&&
                  <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl ">
                    <p>{item.sender?.fullName}</p>
                    <p className="text-gray-300">{item.content}</p>
                  </div>}
                  {item.img&&
                  
                  <img src={item.img}  alt="Message Image" className="rounded-sm w-[53%] h-[53%]"/>
                }
                  <Avatar>
                    <AvatarFallback>{item.sender?.fullName[0]}</AvatarFallback>
                  </Avatar>
                </div>
              )
            )}
          </ScrollArea>

          <div className={`relative p-0`}>
            <div
              className="pb-0 border-t border-b-0 border-x-0 
          outline-none focus:outline-none focus:ring-0 rounded-md"
            >
              {imgUrl && imgUrl != "" && (
                <div className="mt-3 mb-3">
                  <img src={imgUrl} className="size-1/5 rounded-md" />
                  <Button
                    type="button"
                    className="absolute left-[4rem] top-[-0.5rem] rounded-full"
                    size="icon"
                    variant="ghost"
                  >
                    <IoClose
                      onClick={() => {
                        setImgUrl("");
                      }}
                    />
                  </Button>
                </div>
              )}
              <Input
                className="border-gray-700"
                value={message}
                onChange={handleMessageChange}
              />
              <Button
                type="button"
                className="absolute right-9 top-0"
                size="icon"
                variant="ghost"
              >
                <BsFillImageFill
                  size={20}
                  onClick={() => {
                    imageRef.current.click()}}
                />
                <input
                  type={"file"}
                  hidden
                  ref={imageRef}
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Button>
              <Button
                type="submit"
                className="absolute right-1 top-0 rounded-full"
                size="icon"
                variant="ghost"
              >
                <PaperPlaneIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatBox;
