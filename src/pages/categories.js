import { Card } from "@/components/Card";
import Navbar from "@/components/Navbar";
import Summary from "@/components/Summary";
import { getAllTransactions } from "@/services/transaction";
import { useCallback, useEffect, useState } from "react";
import UserIcon from "@/assets/images/user.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getUser } from "@/services/auth";
import { Popup } from "@/components/Popup";
import categoryIcon from "@/assets/images/category.svg";
import { useRouter } from "next/router";
import { showToast } from "../utils";
import { getCategories } from "@/services/category";

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const { fullName } = useSelector((state) => state.user);
  const [openAlert, setOpenAlert] = useState(false);
  const [username, setUserName] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categories = await getCategories();
      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      console.error("Error loading Categories:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <section>
        <div className="container">
          <h1 className="text-large">Categories </h1>
          <p className="text-lead primary-color">
            All Available Categories, Now you can create a <strong>BUDGET</strong>{" "}
            per Category
          </p>
          <div className="container-categories  py-2">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <Image
                  width={50}
                  priority
                  src={categoryIcon}
                  alt="category Icon"
                />
                <span>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
