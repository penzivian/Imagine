import React, { useEffect, useState } from "react";
import { Loader, Card, FormField } from "../components";
import Navbar from "../components/Navbar";

// For rendering the cards
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // For Login/Logoout
  const [checkLogin, setCheckLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const checkLoginFunc = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("https://ai-image-generator-2-0-six.vercel.app/api/v1/checklogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setCheckLogin(true);
        setName(data.message.name);
        setEmail(data.message.email);
      } else {
        setCheckLogin(false);
      }
    };

    checkLoginFunc();
  }, []);

  //   For getting the posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch("https://ai-image-generator-2-0-six.vercel.app/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <>
      <Navbar checkLogin={checkLogin} setCheckLogin={setCheckLogin} name={name} email={email}/>
      <section className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">
            The Community Showcase
          </h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
            Browse through a collection of imaginative and visually stunning
            images, <b>Just "Imagine"</b>
          </p>
        </div>

        {/* Form Component */}
        <div className="mt-16">
          <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search posts"
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>

        {/* Loader Component */}
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            // Results Section
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing results for{" "}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}

              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No search results found"
                  />
                ) : (
                  <RenderCards data={allPosts} title="No posts found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
