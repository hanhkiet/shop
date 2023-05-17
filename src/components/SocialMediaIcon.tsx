type Props = {
  shopSocialId: string;
  icon: string;
};

function SocialMediaIcon(props: Props) {
  const imgIcon = () => {
    let socialMediaImg = '';
    let socialMediaUrl = '';

    if (props.icon === 'facebook') {
      socialMediaImg = 'https://cdn-icons-png.flaticon.com/512/20/20673.png';
      socialMediaUrl = 'https://www.facebook.com/';
    } else if (props.icon === 'twitter') {
      socialMediaImg = 'https://cdn-icons-png.flaticon.com/512/733/733635.png';
      socialMediaUrl = 'https://twitter.com/';
    } else if (props.icon === 'instagram') {
      socialMediaImg =
        'https://cdn-icons-png.flaticon.com/512/1384/1384031.png';
      socialMediaUrl = 'https://www.instagram.com/';
    } else if (props.icon === 'youtube') {
      socialMediaImg =
        'https://cdn-icons-png.flaticon.com/512/1384/1384028.png';
      socialMediaUrl = 'https://www.youtube.com/';
    } else if (props.icon === 'tiktok') {
      socialMediaImg =
        'https://cdn-icons-png.flaticon.com/512/3046/3046120.png';
      socialMediaUrl = 'https://www.tiktok.com/@';
    } else if (props.icon === 'linkedin') {
      socialMediaImg =
        'https://cdn-icons-png.flaticon.com/512/1384/1384014.png';
      socialMediaUrl = 'https://www.linkedin.com/company/';
    }

    return {
      socialMediaImg,
      socialMediaUrl,
    };
  };
  return (
    <a
      className="opacity-70 hover:opacity-100"
      href={imgIcon().socialMediaUrl + props.shopSocialId.replace('@', '')}
      target="_blank"
      rel="noopener"
      title="company social media"
    >
      <img src={imgIcon().socialMediaImg} className="h-5" alt="" />
    </a>
  );
}

export default SocialMediaIcon;
