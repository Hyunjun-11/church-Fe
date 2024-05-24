import BoardLayout from "../../common/board/BoardLayout";
import ImageBoardLayout from "../../common/imageBoard/ImageBoardLayout";

const ImageBoardTest = () => {
  const imgList = [
    {
      id: 1,
      title: "냥냥",
      url: "https://storage.googleapis.com/church_image_demo_11/%EB%83%A5%EB%83%A5.png",
      date: "2024-04-04",
    },
    {
      id: 2,
      title: "냥냥2",
      url: "https://storage.googleapis.com/church_image_demo_11/%EB%83%A5%EB%83%A52.png",
      date: "2024-04-04",
    },
    {
      id: 3,
      title: "냥냥2",
      url: "https://storage.googleapis.com/church_image_demo_11/%EB%83%A5%EB%83%A52.png",
      date: "2024-04-04",
    },
    {
      id: 4,
      title: "냥냥2",
      url: "https://storage.googleapis.com/church_image_demo_11/%EB%83%A5%EB%83%A52.png",
      date: "2024-04-04",
    },
  ];
  return (
    <div>
      <ImageBoardLayout title={"이미지테스트"} imageList={imgList} />
    </div>
  );
};

export default ImageBoardTest;
