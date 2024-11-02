import { Component, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { FileInfo } from '../../domain/path/fileInfo';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-show-local-files',
  standalone: true,
  imports: [NgIf, NgFor, NgForOf, MatTableModule ],
  templateUrl: './show-local-files.component.html',
  styleUrl: './show-local-files.component.css'
})
export class ShowLocalFilesComponent implements OnInit {
  files: string[] = [];
  metaData: FileInfo[] = [];
  fileInfo: FileInfo[] = [];
  rootPath = '.';
  currentPath!: FileInfo;
  traversedPaths: FileInfo[] = [];

  displayedColumns: string[] = ['path', 'isFile', 'isDirectory', 'isSymLink', 'len', 'modified','created','accessed'];
  dataSource = this.fileInfo;

  ngOnInit() {
    this.getFileInfo(this.makeFileInfo(this.rootPath));
  }

  getFileInfo(nextPath: FileInfo) {
    const path = nextPath.path;
    invoke<any[]>("get_file_info", { path }).then((fileArray) => {
      this.fileInfo = fileArray.map((data) => new FileInfo(data));
      const lastPath = this.traversedPaths[this.traversedPaths?.length - 1];
      if (nextPath.path !== lastPath?.path){
        // Handle the initial search of root (lastPath won't exist, nor will current)
        if(this.currentPath){
          // Put the current path at the top of the new list of paths so we can go back
          this.fileInfo.unshift(structuredClone(this.currentPath));
          // record that we came from
          this.traversedPaths.push(this.currentPath)
        };
        this.currentPath = nextPath;
        // Else we are going back
      } else {
        // Fetch the path twice back, it will now be the new 'last Path'
        const secondLastPath = this.traversedPaths[this.traversedPaths?.length - 2];
        // and put the last path at the top of the list
        if (secondLastPath){this.fileInfo.unshift(secondLastPath)};
        // then remove the last path from the list so we can keep going back
        this.traversedPaths.pop();
        this.currentPath = lastPath;
      }
    });
  }

  getFolder(row: FileInfo){
    if ((row.isDirectory && row.path) || row === this.traversedPaths[this.traversedPaths?.length - 1]){
      this.getFileInfo(row);
    }
  }

  makeFileInfo(path: string): FileInfo{
    const info: FileInfo = new FileInfo({
      path: path,
      isFile: false,
      isDirectory: true,
      isSymLink: false,
      len: null,
      modified: '',
      created: '',
      accessed: ''
    });
    return info;
  }
}
