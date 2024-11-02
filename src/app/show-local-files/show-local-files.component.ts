import { Component, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { FileInfo } from '../../domain/path/fileInfo';
import { MatTableModule } from '@angular/material/table';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-show-local-files',
  standalone: true,
  imports: [NgIf, NgFor, NgForOf, MatTableModule, CdkVirtualScrollViewport ],
  templateUrl: './show-local-files.component.html',
  styleUrl: './show-local-files.component.css'
})
export class ShowLocalFilesComponent implements OnInit {
  files: string[] = [];
  metaData: FileInfo[] = [];
  // fileInfo: FileInfo[] = [{path: '', isFile: true, isDirectory: false, fileType: '', isSymLink: false, len: 10, modified: new Date(), created: new Date(), accessed: new Date()}];
  fileInfo: FileInfo[] = [];
  rootPath = '.';
  traversedPaths: FileInfo[] = [new FileInfo({path: this.rootPath})];

  displayedColumns: string[] = ['path', 'isFile', 'isDirectory', 'fileType', 'isSymLink', 'len', 'modified','created','accessed'];
  // displayedColumns: string[] = ['path', 'isFile', 'isDirectory', 'fileType', 'isSymLink',];
  dataSource = this.fileInfo;

  ngOnInit() {
    this.setLastPath(this.rootPath);
    this.getFileInfo(this.rootPath);
  }

  // getFiles(path: string) {
  //   invoke<string[]>("get_files", { path }).then((filesArray) => {
  //     this.files = filesArray;
  //   });
  // } 

  getFileInfo(path: string) {
    invoke<any[]>("get_file_info", { path }).then((fileArray) => {
      this.fileInfo = fileArray.map((data) => new FileInfo(data));
      if (path === this.traversedPaths[-1].path){
        const lastPath = this.traversedPaths.pop();
        if (lastPath) {this.fileInfo.unshift(lastPath)};
      } else {
        this.setLastPath(path);
      }
    });
  }

  getFolder(row: FileInfo){
    if (row.isDirectory && row.path){
      console.log(row);
      this.getFileInfo(row.path);
    }
  }

  setLastPath(path: string){
    this.traversedPaths.push({
      path: path,
      isFile: false,
      isDirectory: true,
      isSymLink: false,
      len: null,
      modified: null,
      created: null,
      accessed: null
    })
  }
}
