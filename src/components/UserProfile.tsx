backend:
  name: git-gateway
  repo: emonsaqibh/Repapers-2.0
  branch: main

media_folder: "Repapers/public/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "categories"
    label: "Categories"
    files:
      - label: "All Categories"
        name: "all_categories"
        file: "Repapers/public/categories.json"
        widget: "list"
        fields:
          - {name: id, label: ID, widget: string, hint: "A unique ID, e.g., sci-fi"}
          - {name: name, label: Name, widget: string, hint: "The display name, e.g., Sci-Fi"}

  - name: "wallpapers"
    label: "Wallpapers"
    files:
      - label: "Wallpapers"
        name: "all_wallpapers"
        file: "Repapers/public/wallpapers.json"
        widget: "list"
        fields:
          - {name: id, label: ID, widget: string}
          - {name: title, label: Title, widget: string}
          - name: author
            label: Author
            widget: object
            fields:
              - {name: name, label: "Author Name", widget: string}
              - {name: title, label: "Author Title", widget: string}
          - name: category
            label: Category
            widget: relation
            collection: "categories"
            searchFields: ["name"]
            valueField: "id"
            displayFields: ["name"]
          - {name: tags, label: Tags, widget: list}
          - name: download_options
            label: Download Options
            widget: list
            fields:
              - {name: resolution, label: Resolution, widget: select, options: ["1080p", "2K", "4K", "8K", "Mobile"]}
              - {name: path, label: "File (Upload Here)", widget: image} # <-- This line was changed
