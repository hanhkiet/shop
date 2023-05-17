import DownloadApp from './DownloadApp';
import SocialMediaIcon from './SocialMediaIcon';

export default function ConnectSection() {
  return (
    <div className="mx-10 grid justify-items-center">
      <h2 className="mb-5 font-bold uppercase">CONNECT</h2>
      <div className="mb-5 flex justify-between gap-6">
        <SocialMediaIcon shopSocialId="asrvsportswear" icon="facebook" />
        <SocialMediaIcon shopSocialId="asrvsportswear" icon="twitter" />
        <SocialMediaIcon shopSocialId="asrv" icon="instagram" />
        <SocialMediaIcon shopSocialId="ASRVsportswear" icon="youtube" />
        <SocialMediaIcon shopSocialId="@asrv" icon="tiktok" />
        <SocialMediaIcon shopSocialId="asrv" icon="linkedin" />
      </div>
      <div className="w-64 items-center">
        <DownloadApp />
      </div>
    </div>
  );
}
