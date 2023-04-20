export interface comicProps {
  id: number;
  title: string;
  creators: {
    items: [
      {
        name: string;
      }
    ];
  };
  description: string;
  prices: [
    {
      type: string;
      price: number;
    }
  ];
  thumbnail: {
    path: string;
    extension: string;
  };
}
