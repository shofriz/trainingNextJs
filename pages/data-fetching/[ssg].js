export default function SSG() {
    return <div className="a-full"></div>;
  }
  
  export async function getStaticPaths(context) {
    let data = [];
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((response) => {
        data = response;
      });
    let paths = [];
  
    if (Array.isArray(data) && data.length > 0) {
      paths = data.map((post) => ({
        params: {
          ssg: `${post.id.toString()}`,
        },
      }));
    }
  
    return { paths, fallback: false };
  }
  export async function getStaticProps(context) {
    let data = [];
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((response) => {
        data = response;
      });
  
    return {
      props: {
        data,
      },
    };
  }
  