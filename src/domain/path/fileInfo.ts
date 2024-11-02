export class FileInfo {
    public path: string | null = null;
    public fileName: string | null = null;
    public isFile: boolean | null = null;
    public isDirectory: boolean | null = null;
    // public fileType: string | null = null;
    public isSymLink: boolean | null = null;
    public len: number | null = null;
    // public permissions
    public modified: string | null = null;
    public created: string | null = null;
    public accessed: string | null = null;

    constructor(data: any = null){
        if (data !== null) {
            this.path = data.path;
            this.isFile = data.is_file;
            this.isDirectory = data.is_dir;
            // this.fileType = data.file_type;
            this.isSymLink = data.is_symlink;
            this.len = data.len;
            this.modified = data.modified;
            this.created = data.created;
            this.accessed = data.accessed;
        }
    }
}