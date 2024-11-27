import { useMemo } from "react";

export const useRecipePermissions = (recipe) => {
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));

  return useMemo(() => {
    if (!recipe || !currentUser)
      return {
        canRate: false,
        canComment: false,
        canFavorite: false,
        canEdit: false,
        isOwner: false,
      };

    const isOwner = Number(recipe.userId) === Number(currentUser.id);

    return {
      canRate: !isOwner,
      canComment: !isOwner,
      canFavorite: !isOwner,
      canEdit: isOwner,
      isOwner,
      currentUserId: currentUser.id,
    };
  }, [recipe, currentUser]);
};
