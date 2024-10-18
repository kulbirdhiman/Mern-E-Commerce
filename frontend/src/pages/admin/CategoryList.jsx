import { useEffect, useState, useMemo } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  
  const [formState, setFormState] = useState({ name: "", updatingName: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!formState.name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name: formState.name }).unwrap();
      setFormState({ ...formState, name: "" });
      refetch(); // Only refetch after success
      toast.success(`${result.name} is created.`);
    } catch (error) {
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!formState.updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: formState.updatingName },
      }).unwrap();
      setModalVisible(false);
      setFormState({ ...formState, updatingName: "" });
      setSelectedCategory(null);
      refetch();
      toast.success(`${result.name} is updated`);
    } catch (error) {
      toast.error("Updating category failed.");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      setModalVisible(false);
      setSelectedCategory(null);
      refetch();
      toast.success(`${result.name} is deleted.`);
    } catch (error) {
      toast.error("Category deletion failed. Try again.");
    }
  };

  // Memoize categories to avoid unnecessary re-renders
  const categoryButtons = useMemo(() => {
    console.log("hello")
    return categories?.map((category) => (
      <div key={category._id}>
        <button
          className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          onClick={() => {
            setModalVisible(true);
            setSelectedCategory(category);
            setFormState({ ...formState, updatingName: category.name });
          }}
        >
          {category.name}
        </button>
      </div>
    ));
  }, [categories, formState]);

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={formState.name}
          setValue={(value) => setFormState({ ...formState, name: value })}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">{categoryButtons}</div>

        {modalVisible && (
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <CategoryForm
              value={formState.updatingName}
              setValue={(value) =>
                setFormState({ ...formState, updatingName: value })
              }
              handleSubmit={handleUpdateCategory}
              buttonText="Update"
              handleDelete={handleDeleteCategory}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
